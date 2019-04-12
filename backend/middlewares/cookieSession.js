const cookieSession = require("cookie-session");

module.exports = cookieSession({
  name: "user-from-github",
  keys: [process.env.COOK_KEY],
  domain: "vrs-git-auth.zeit.sh",
  maxAge: 24 * 60 * 60 * 1000
});
