var express = require('express');
var router = express.Router();
var models = require('../../models');
var Day = models.Day;
var Hotel = models.Hotel;

// want to return array of model

// router.get('/:id', function(req, res, next) {
// 	res.json(...)
// })

// router.delete('/:id', function(req, res, next) {
// 	res.json(...)
// })


var amtDays = 0;

router.get('/getDay/:dayNum', function(req, res, next) {
    Day.find({
        number: req.params.dayNum
    }).exec()
        .then(function(foundDay) {
            console.log('search:', foundDay.hotels)
            res.json(foundDay);
        })
})

router.get('/', function(req, res, next) {
    Day.find({}).exec()
        .then(function(allDays) {
            res.json(allDays);
        })
})

router.delete('/clear', function(req, res, next) {
    Day.remove({}).exec()
        .then(function(remove) {
            res.json("Removed Days");
        })
})

router.get('/clearOne/:dayNum', function(req, res, next) {
    Day.remove({
        number: req.params.dayNum
    }).exec()
        .then(function(remove) {
            res.json("Removed Day");
        })
})

router.post('/', function(req, res, next) {

    getNumberDays().then(function(totalDays) {
        var dayAmt = totalDays.length + 1;
        var newDay = new Day({
            number: dayAmt
        })
        return newDay.save()
    }).then(function(createdDay) {
        res.json(createdDay);
    });
})

function getNumberDays() {
    return Day.find({}).exec()
}



router.post('/:dayNum/hotels/:hotelId', function(req, res, next) {
    var setDay = req.params.dayNum;
    console.log(setDay);
	    Day.findOne({
	    	number: setDay
	    })
        .then(function(day) {
        	day.hotels = req.params.hotelId
        	return day.save()
        })
        .then(function(updatedDay) {
        	return Day.findById(updatedDay._id).populate('hotels')
        }).then(function(populatedDay){
        	console.log('pop:',populatedDay);
        	res.json(populatedDay);
        }).then(null, console.error.bind(console))
})

router.post('/:dayNum/restaurants/:restId', function(req, res, next) {
    var setDay = req.params.dayNum;
    console.log(setDay);
        Day.findOne({
            number: setDay
        })
        .then(function(day) {
            day.restaurants = req.params.restId
            return day.save()
        })
        .then(function(updatedDay) {
            return Day.findById(updatedDay._id).populate('restaurants')
        }).then(function(populatedDay){
            console.log('pop:',populatedDay);
            res.json(populatedDay);
        }).then(null, console.error.bind(console))
})
router.post('/:dayNum/activities/:activityId', function(req, res, next) {
    var setDay = req.params.dayNum;
    console.log(setDay);
        Day.findOne({
            number: setDay
        })
        .then(function(day) {
            day.activities = req.params.activityId
            return day.save()
        })
        .then(function(updatedDay) {
            return Day.findById(updatedDay._id).populate('activities')
        }).then(function(populatedDay){
            console.log('pop:',populatedDay);
            res.json(populatedDay);
        }).then(null, console.error.bind(console))
})

router.get('/pop', function(req, res, next) {
    Day.find({}).populate('hotel restaurants activities').execPopulate().then(function(popDay) {
        // popDay now has objects in place of _id s!
        console.log(popDay);
    });
})








module.exports = router;