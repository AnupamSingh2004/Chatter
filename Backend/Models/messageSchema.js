const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === "text";
        },
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType === "file";
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }

});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;