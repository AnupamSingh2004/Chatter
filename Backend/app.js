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

const clientid = "YOUR GOOGLE CLIENTID"
const clientsecret = "YOUR GOOGLE CLIENTSECRET"


app.use(cors({
    origin:"http://localhost:3001",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());


app.use(session({
    secret:"YOUR SECRET KEY",
    resave:false,
    saveUninitialized:true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
            clientID:clientid,
            clientSecret:clientsecret,
            callbackURL:"/auth/google/callback",
            scope:["profile","email"]
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                let user = await userdb.findOne({googleId:profile.id});

                if(!user){
                    user = new userdb({
                        googleId:profile.id,
                        displayName:profile.displayName,
                        email:profile.emails[0].value,
                        image:profile.photos[0].value
                    });

                    await user.save();
                }

                return done(null,user)
            } catch (error) {
                return done(error,null)
            }
        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});




app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})
