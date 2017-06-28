var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Day = require('../models').Day;

router.get('/', function(req, res, next) {
  Day.findAll({ include: [Hotel, Restaurant, Activity]})
  .then(days => {
  	// console.log('Getting all days', days)
    res.json(days)
  })
  .catch(next)
})

router.get('/:id', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [Hotel, Restaurant, Activity]})
  .then(foundDay => {
    res.json(foundDay)
  })
  .catch(next)
})

router.post('/', function(req, res, next) {
  Day.create({number: req.body.number})
  .then(createdDay => {
    res.json(createdDay)
  })
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Day.destroy({where: {number: req.params.id}})
  .then(deletedDay => {
    res.json(deletedDay)
  })
  .catch(next)
})

router.post('/:id/hotel', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Hotel}]})
  .then(foundDay => {
    return foundDay.update({hotelId: req.body.attractionId})
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})

router.post('/:id/restaurant', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Restaurant}]})
  .then(foundDay => {
    foundDay.addRestaurant(req.body.attractionId)
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})

router.post('/:id/activity', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Activity}]})
  .then(foundDay => {
    foundDay.addActivity(req.body.attractionId)
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})

router.put('/:id/hotel', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Hotel}]})
  .then(foundDay => {
    return foundDay.update({hotelId: null})
  })
  .then(updatedDay => {
    res.json(updatedDay)
  })
  .catch(next)
})

router.put('/:id/restaurant', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Restaurant}]})
  .then(foundDay => {
    foundDay.removeRestaurant(req.body.attractionId)
  })
  .then(() => {
    res.sendStatus(202)
  })
  .catch(next)
})

router.put('/:id/activity', function(req, res, next) {
  Day.findOne({where: {number: req.params.id}, include: [{model: Activity}]})
  .then(foundDay => {
    foundDay.removeActivity(req.body.attractionId);
  })
  .then(() => {
    res.sendStatus(202);
  })
  .catch(next)
})

module.exports = router
