const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const app = require("../../utils/app");
const UserSchema = require("../../models/User");

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://vrs-git-auth.zeit.sh/auth/github"
    },
    async function passportVerifyCallback(token, tokenSecret, profile, cb) {
      console.log(profile);
      try {
        conn = await mongoose.createConnection(process.env.MONGODB_ATLAS_URI, {
          bufferCommands: false,
          bufferMaxEntries: 0
        });
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
              console.log("error: ...", err);
              cb(err);
            }
            console.log("success: ...", user._doc);
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
  console.log("user on req:", req.user);
  const { id } = req.user;
  delete req.session.passport;
  req.session["user-from-github"] = {
    id
  };
  res.redirect("/");
});

module.exports = app;
