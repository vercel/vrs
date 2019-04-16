const app = require("../../utils/app");

app.get("*", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = app;
