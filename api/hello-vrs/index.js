const express = require("express");

const app = express();

app.get("*", (req, res) => {
  res.json({ hello: "vrs" });
});

module.exports = app;
