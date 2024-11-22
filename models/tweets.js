const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  nickname: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  content: String,
  likes: Number,
});

const Tweet = mongoose.model("tweets", tweetsSchema);

module.exports = Tweet;
