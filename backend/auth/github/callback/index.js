const app = require("../../utils/app");
const passport = require("passport");

app.get(
  "*",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("user on req:", req.user);
    const { id, username, avatar } = req.user;
    res.cookie("user-from-github", JSON.stringify({ id, username, avatar }));
    res.json({ id, username, avatar });
  }
);

module.exports = app;
