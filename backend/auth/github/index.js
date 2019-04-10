const path = require("path");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const app = require("../../utils/app");

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/"
    },
    function passportVerifyCallback(token, tokenSecret, profile, cb) {
      console.log(profile);
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("*", passport.authenticate("github"), (req, res) => {
  delete req.session.passport;
  console.log(req.user._json);
  const { name } = req.user._json;
  req.session["user-from-github"] = {
    name
  };
  res.redirect("/");
});

module.exports = app;
