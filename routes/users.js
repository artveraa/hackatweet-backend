var express = require('express');
var router = express.Router();


require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['nickname', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ nickname: req.body.nickname }).then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({ result: true, token: data.token, name: data.username, data });
      } else {
        res.json({ result: false, error: 'User not found or wrong password' });
      }   
  });
});

module.exports = router;

