var express = require("express");
var router = express.Router();

require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/postTweet/:token", (req, res) => {
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.params.token }).then((user) => {
    if (!user) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    const newTweet = new Tweet({
      user: user._id,
      date: new Date(),
      content: req.body.content,
      likes: 0,
    });

    newTweet.save().then((data) => {
      res.json({ result: true, tweet: data });
    });
  });
});

router.get("/getTweets", (req, res) => {
  Tweet.find()
    .populate("user")
    .sort({ date: -1 })
    .then((data) => {
      res.json({ result: true, tweet: data });
    });
});

router.delete("deleteTweet/:token", (req, res) => {
  Tweet.find().populate("user");

  
});

module.exports = router;
