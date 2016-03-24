var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');


//router.use(require('./api'))

// router.get('/api/hotels.js', function(req, res, next) {
//   require('./api/hotels.js')
// });
router.use('/api/hotels', require('./api/hotels'));
router.use('/api/restaurants', require('./api/restaurants'));
router.use('/api/activities', require('./api/activities'));
router.use('/api/days', require('./api/days'));



router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  });
});

module.exports = router;
