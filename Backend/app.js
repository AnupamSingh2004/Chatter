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
            console.log("profile", profile);
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
    console.log("reqqq", req.user);

    if (req.user) {
        res.status(200).json({message: "User Logged in", user: req.user});
    } else {
        res.status(400).json({message: "No user logged in"});
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


app.listen(PORT, () => {
    console.log(`server start at port no ${PORT}`)
})


