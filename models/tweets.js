const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  content: String,
  likes: Number,
});

const Tweet = mongoose.model("tweets", tweetsSchema);

module.exports = Tweet;
