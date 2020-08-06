var express = require('express');
var router = express.Router();
var fs = require("fs");
var Mock = require('mockjs');
var Random = Mock.Random;

var clusterList = require('../public/clusters');


router.get('/list', function(req, res, next) {
  fs.readFile(__dirname + "/../public/clusters.json", 'utf8', function (err, data) {
    if (req.query.curUser) {
      data = JSON.parse(data);
      fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data2) {
        data2 = JSON.parse( data2 );
        var user = data2.users.find(function(item) {
          return item.active;
        });
        if (user) {
          res.json({clusters: data.clusters.filter(item => user.clusters.includes(item.id))});
        } else {
          res.json(data);
        }
      });
    } else {
      res.end( data );
    }
  });
});

router.post('/list/add', function(req, res, next) {
  var resourceData = {
    "state": "health",
    "iops": [
      {
        "total": 0, "read": 0, "write": 0
      },
      {
        "total": 0, "read": 8, "write": 0
      },
      {
        "total": 0, "read": 0, "write": 0
      },
      {
        "total": 0, "read": 0, "write": 0
      },
      {
        "total": 0, "read": 0, "write": 0
      }
    ],
    "bytePerSecond": [
      {
        "read": 0, "write": 0
      },
      {
        "read": 0, "write": 0
      },
      {
        "read": 0, "write": 0
      },
      {
        "read": 0, "write": 0
      },
      {
        "read": 0, "write": 0
      }
    ],
    "alarm": {
      "critical": 0,
      "serious": 0,
      "warning": 0,
      "prompt": 0
    },
    "capaticy": {
      "physic": {"total": 0, "available": 0},
      "avail": {"total": 0, "available": 0}
    },
    "mon": {"total": 0, "active": 0},
    "server": {"total": 0, "active": 0},
    "pool": {"total": 0, "active": 0},
    "disk": {"total": 0, "active": 0},
    "iscsi": {"total": 0, "active": 0},
    "mds": {"total": 0, "active": 0}
  };
  var addCluster = {id: Random.uuid(), ...resourceData, ...req.body};
  fs.readFile(__dirname + "/../public/clusters.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data.clusters.push(addCluster);
    fs.writeFile(__dirname + "/../public/clusters.json", JSON.stringify(data), function(err) {
      if (err) {
        return res.status(500);
      }
      fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
        userData = JSON.parse( data );
        var user = userData.users.find(function(item) {
          return item.active;
        });
        if (user) {
          user.clusters.push(addCluster.id);
          fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(userData), function(err) {
            if (err) {
              return res.status(500);
            }
            res.json(addCluster);
          });
        } else {
          res.status(400);
        }
      });
    });
  });
});

router.delete('/list/:id', function(req, res, next) {
  fs.readFile(__dirname + "/../public/clusters.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data.clusters = data.clusters.filter(function(item) {
      return item.id !== req.params.id;
    });
    fs.writeFile(__dirname + "/../public/clusters.json", JSON.stringify(data), function(err) {
      if (err) {
        return res.status(500);
      }
      fs.readFile(__dirname + "/../public/users.json", 'utf8', function (err, data) {
        userData = JSON.parse( data );
        userData.users.forEach(function(item) {
          item.clusters = item.clusters.filter(x => x !== req.params.id);
        });
        fs.writeFile(__dirname + "/../public/users.json", JSON.stringify(userData), function(err) {
          if (err) {
            return res.status(500);
          }
          res.json({result: 'ok'});
        });
      });
    });
  });
});

router.get('/list/:id', function(req, res, next) {
  fs.readFile(__dirname + "/../public/clusters.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var cluster = data.clusters.find(function(item) {
      return item.id === req.params.id;
    });
    if (cluster) {
      res.json(cluster);
    } else {
      res.status(400);
    }
  });
});

module.exports = router;
