const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const app = require("../../utils/app");
const UserSchema = require("../../models/User");

app.use(passport.initialize());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://serverless-vrs.now.sh/auth/github"
    },
    async function passportVerifyCallback(token, tokenSecret, profile, cb) {
      try {
        const conn = await mongoose.createConnection(process.env.MONGODB_ATLAS_URI, {
          bufferCommands: false,
          bufferMaxEntries: 0
        });
        const User = conn.model("User", UserSchema);
        User.findOrCreate(
          {
            id: profile.id,
            name: profile.displayName,
            username: profile.username,
            avatar: profile.photos[0].value
          },
          (err, user) => {
            if (err) {
              cb(err);
              return;
            }
            cb(null, user._doc);
          }
        );
      } catch (e) {
        cb(e);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("*", passport.authenticate("github"), async (req, res) => {
  const { id, username, avatar } = req.user;
  res.cookie("user-from-github", JSON.stringify({ id, username, avatar }));
  res.redirect("/store");
});

module.exports = app;
