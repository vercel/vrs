require("dotenv").config();
const cookieSession = require("cookie-session");

module.exports = cookieSession({
  name: "user-from-github",
  keys: [process.env.COOK_KEY],
  domain: "localhost:3000",
  maxAge: 24 * 60 * 60 * 1000
});
