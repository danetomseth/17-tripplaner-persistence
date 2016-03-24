var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;

// want to return array of model

router.get('/', function(req, res, next) {
	Hotel.find({}).exec().then(function(hotels) {
		res.json(hotels);
	})	
})




module.exports = router;