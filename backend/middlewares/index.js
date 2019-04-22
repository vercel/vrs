const cookieParser = require("./cookieParser");
const { json } = require("express");

module.exports = [cookieParser, json];
