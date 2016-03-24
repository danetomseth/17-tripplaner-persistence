var express = require('express');
var router = express.Router();
var models = require('../../models');
var Activity = models.Activity;

router.get('/', function(req, res, next) {
	Activity.find({}).exec().then(function(activities) {
		res.json(activities);
	})	
})



module.exports = router;