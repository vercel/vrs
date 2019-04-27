const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const app = require("../../utils/app");
const UserSchema = require("../../models/User");

app.use(passport.initialize());
//app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("*", passport.authenticate("github"), async (req, res) => {
  let proto = "http";
  let host = req.headers.host;

  if (process.env.NODE === "production") {
    proto = "https";
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${proto}://${host}/auth/github/callback`
      },
      async function passportVerifyCallback(token, tokenSecret, profile, cb) {
        console.log(profile);
        try {
          conn = await mongoose.createConnection(
            process.env.MONGODB_ATLAS_URI,
            {
              bufferCommands: false,
              bufferMaxEntries: 0
            }
          );
          const User = conn.model("User", UserSchema);
          User.findOrCreate(
            {
              id: profile.id,
              name: profile.displayName,
              username: profile.username,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value
            },
            (err, user) => {
              if (err) {
                console.log("error finding or creating user:", err);
                res.status(500).json({ error: err });
              }
              console.log("success: ...", user._doc);
              cb(null, user._doc);
            }
          );
        } catch (e) {
          console.log("verify callback error:", e.message);
          res.status(500).json({ error: e.message });
        }
      }
    )
  );
});

module.exports = app;
