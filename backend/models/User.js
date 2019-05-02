const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

UserSchema.plugin(findOrCreate);

module.exports = UserSchema;
