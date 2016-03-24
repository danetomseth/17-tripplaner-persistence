var express = require('express');
var router = express.Router();
var models = require('../../models');
var Restaurant = models.Restaurant;

// want to return array of model

router.get('/', function(req, res, next) {
	Restaurant.find({}).exec().then(function(restaurants) {
		res.json(restaurants);
	})	
})

module.exports = router;
