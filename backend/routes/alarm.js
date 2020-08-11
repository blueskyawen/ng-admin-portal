var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/list', function(req, res, next) {
    fs.readFile(__dirname + "/../public/alarms.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var filterF = req.query.type;
        if (filterF === 'all') {
            res.json( data );
        } else {
            res.json({alarms: data.alarms.filter(x => x.grade === filterF)});
        }
    });
});

module.exports = router;