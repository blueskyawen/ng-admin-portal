var express = require('express');
var router = express.Router();

var clusterList = require('../public/clusters');


router.get('/list', function(req, res, next) {
  res.json(clusterList);
});

router.get('/list/:id', function(req, res, next) {
  var oneCluster = clusterList.clusters.find(function(cluster) { return cluster.id === req.params.id; });
  if (oneCluster) {
    res.json(oneCluster);
  } else {
    res.status(404).json({});
  }
});

module.exports = router;
