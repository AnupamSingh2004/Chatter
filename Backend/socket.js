const SocketIOServer = require('socket.io').Server;

const Message = require('./Models/messageSchema.js');


const setUpSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client disconnected ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }


    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id).populate("sender", "id email displayName image color").populate("recipient", "id email displayName image color");

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("recieveMessage", messageData);
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("recieveMessage", messageData);
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket id ${socket.id}`)

        } else {
            console.log(`User id not provided during connection`);
        }

        socket.on("sendMessage", () => sendMessage(message));
        socket.on("disconnect", () => disconnect(socket))
    });
};

module.exports = setUpSocket;