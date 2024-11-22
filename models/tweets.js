const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: Date,
  content: String,
  likes: { type: Number, default: 0 },
});

const Tweet = mongoose.model("tweets", tweetsSchema);

module.exports = Tweet;
