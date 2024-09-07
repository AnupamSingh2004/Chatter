require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./Database/connection")
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./Models/userSchema");
const setupSocket = require("./socket.js");
const Message = require('./Models/messageSchema');

const clientid = process.env.CLIENT_ID
const clientsecret = process.env.CLIENT_SECRET


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
}));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
            clientID: clientid,
            clientSecret: clientsecret,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log("profile", profile);
            try {
                let user = await userdb.findOne({googleId: profile.id});

                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });

                    await user.save();
                }

                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "http://localhost:5173/login"
}))


app.get("/login/sucess", async (req, res) => {
    // console.log("reqqq", req.user);

    if (req.user) {
        res.status(200).json({message: "User Logged in", user: req.user});
        return res.status(200);
    } else {
        res.status(400).json({message: "No user logged in"});
        return res.status(404);
    }
})

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173/login");
    });
})


app.put("/changeProfile/:courseid", async (req, res) => {
    const user = await userdb.findByIdAndUpdate(req.params.courseid, req.body, {new: true});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    } else {
        return res.status(200).json({message: "User updated successfully"});
    }
})


app.post("/search", async (req, res, next) => {
    try {
        const {searchTerm} = req.body;

        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).json({message: "No search term"});
        }

        const sanitizedTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedTerm, "i");

        const contacts = await userdb.find({
            $and: [
                {_id: {$ne: req.user._id}},
                {
                    $or: [{displayName: regex}, {email: regex}]
                }
            ]
        })

        return res.status(200).json({contacts});
    } catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
});

app.post("/getMessages", async (req, res) => {
    try {
        // const user1 = req.body.id1;
        // const user2 = req.body.id;

        const {user1, user2} = req.body;


        if (!user1) {
            return res.status(404).json({message: "User1 not found"});
        }
        if (!user2) {
            return res.status(404).json({message: "User2 not found"});
        }

        const messages = await Message.find({
            $or: [{sender: user1, recipient: user2}, {sender: user2, recipient: user1}],

        }).sort({timestamp: 1});
        return res.status(200).json({messages});

    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");

    }
})

const server =
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })

setupSocket(server);


