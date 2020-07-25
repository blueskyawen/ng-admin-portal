var express = require('express');
var router = express.Router();

var userList = require('../public/users');

router.post('/login', function(req, res, next) {
  var reqData = req.body;
  var user = userList.users.find(function(item) {
    return item.name === reqData.name && item.password === reqData.password;
  });
  if (user) {
    user.active = true;
    res.json({user: user.name});
  } else {
    res.status(401).json({ error: 'name or password error!' })
  }
});

router.get('/users', function(req, res, next) {
  res.json(userList);
});

router.post('/logout', function(req, res, next) {
  var reqData = req.body;
  var user = userList.users.find(function(item) {
   return item.name === reqData.name;
  });
  if (user) {
    user.active = false;
    res.json({user: user.name});
  } else {
    res.status(200).json({})
  }
});

module.exports = router;
