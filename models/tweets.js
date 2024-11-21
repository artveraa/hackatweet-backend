const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  content: String,
  likes: Number,
});

const Tweets = mongoose.model("tweets", tweetsSchema);

module.exports = Tweets;
