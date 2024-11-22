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

router.delete("/deleteTweet", (req, res) => {
  if (!checkBody(req.body, ["content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Tweet.findOneAndDelete({ content: req.body.content }).then((data) => {
    if (!data) {
      res.json({ result: false, error: "Tweet not found" });
      return;
    }

    res.json({ result: true });
  });
});

router.post("/toggleLike/:id", (req, res) => {
  const update = req.body.isLiked
    ? { $inc: { likes: -1 } }
    : { $inc: { likes: 1 } };

  Tweet.findByIdAndUpdate(req.params.id, update, { new: true })
    .then((updatedTweet) => {
      if (!updatedTweet) {
        res.json({ result: false, error: "Tweet not found" });
      } else {
        res.json({ result: true, tweet: updatedTweet });
      }
    })
    .catch((error) => {
      res.json({ result: false, error: error.message });
    });
});

module.exports = router;
