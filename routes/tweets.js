var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.post('/tweeter/:token', (req, res) => {
  if (!checkBody(req.body, ['content'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  User.findOne({token: req.params.token})
  .then(dataFromUser => {
  const date = new Date()
 const newTweet = new Tweet({
        username: dataFromUser._id,
        nickname: dataFromUser._id,
        date: date,
        content: req.body.content,
        likes: 0,
      });

      newTweet.save()
      // .then(newTweet => {
      //   return Tweet.findById(newTweet._id) 
      //   .populate('username') 
      // })
      .then(tweet => { res.json({ result: true, newTweet: tweet });
  });
});
});

router.get('/getTweet', (req, res) => {
  Tweet.find().then(data => {
      res.json({ result: true, tweet: data });
  });
});

  module.exports = router;
