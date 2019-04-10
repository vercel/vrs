const app = require("express")();

const commonMiddlewares = require("../middlewares");

app.set("trust proxy", 1);
app.use(...commonMiddlewares);

module.exports = app;
