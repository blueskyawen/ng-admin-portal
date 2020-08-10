var express = require('express');
var router = express.Router();
var fs = require("fs");
var Mock = require('mockjs');
var Random = Mock.Random;

router.post('/login', function(req, res, next) {
  var reqData = req.body;
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.name === reqData.name && item.password === reqData.password;
    });
    if (user) {
      user.active = true;
      fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
        if (err) {
          return res.status(500);
        }
        res.json({user: user.name});
      });
    } else {
      res.status(401).json({ error: 'name or password error!' })
    }
  });
});

router.post('/register', function(req, res, next) {
  var addUser = {active: false, id: Random.uuid(), lastLogin: '', ...req.body};
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data.users.push(addUser);
    fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
      if (err) {
        return res.status(500);
      }
      res.send(addUser);
    });
  });
});

router.get('/users/:id', function(req, res, next) {
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.id === req.params.id;
    });
    if (user) {
      res.json({id: user.id, name: user.name, phone: user.phone, email: user.email, agree: user.agree});
    } else {
      res.status(400);
    }
  });
});

router.get('/users', function(req, res, next) {
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    res.end( data );
  });
});

router.post('/logout', function(req, res, next) {
  var reqData = req.body;
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.name === reqData.user;
    });
    if (user) {
      user.active = false;
      user.lastLogin = reqData.lastLogin;
      fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
        if (err) {
          return res.status(500);
        }
        res.json({user: user.name});
      });
    } else {
      res.status(200).json({})
    }
  });
});

router.get('/curUser', function(req, res, next) {
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.active;
    });
    if (user) {
      res.json({name: user.name, id: user.id});
    } else {
      res.status(400);
    }
  });
});

router.put('/users/:id/editCluster', function(req, res, next) {
  var reqData = req.body;
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.id === req.params.id;
    });
    if (user) {
      user.clusters = reqData.clusters;
      fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
        if (err) {
          return res.status(500);
        }
        res.json({result: 'ok'});
      });
    } else {
      res.status(400);
    }
  });
});

router.put('/modify', function(req, res, next) {
  var reqData = req.body;
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data.users.find(function(item) {
      return item.name === reqData.name;
    });
    if (user) {
      user.password = reqData.password;
      user.phone = reqData.phone;
      user.email = reqData.email;
      user.clusters = reqData.clusters;
      fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
        if (err) {
          return res.status(500);
        }
        res.json({user: user.name});
      });
    } else {
      res.status(400);
    }
  });
});

router.delete('/users/delete', function(req, res, next) {
  var delUsers = JSON.parse(req.query.ids);
  fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data.users = data.users.filter(function(item) {
      return !delUsers.includes(item.id);
    });
    fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(data), function(err) {
      if (err) {
        return res.status(500);
      }
      res.json({result: 'ok'});
    });
  });
});

module.exports = router;

