const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: String,
  nickname: String,
  avatar: String,
  password: String,
  token: String,
  tweets: { type: mongoose.Schema.Types.ObjectId, ref: "tweets" },
  likes: { type: mongoose.Schema.Types.ObjectId, ref: "tweets" },
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
