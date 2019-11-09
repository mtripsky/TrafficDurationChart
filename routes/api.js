const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const moment = require('moment');

// get list of durations in day from the db
router.get('/traffic-duration/day-stats', function(req, res, next){
    const start = moment(req.query.startDay, 'YYYY.MM.DD');
    const end = moment(start).endOf('day');
    Event.aggregate([
        { $match: {source: "DurationService" }},
        { $match: {dateTime: {$gte: start.toDate(), $lt: end.toDate()}}},
        { $project: {_id: 0, content: 1} }
    ]).exec().then(function(events){
            //console.log(events);
            res.send(events)
        })
      .catch(next);
});

// get list of durations from startDay to endDay from the db
router.get('/traffic-duration/days-stats', function(req, res, next){
    const { startDay, endDay } = req.query;    
    const start = moment(startDay, 'YYYY.MM.DD');
    const end = moment(endDay, 'YYYY.MM.DD').endOf('day');
    Event.aggregate([
        { $match: {source: "DurationService" }},
        { $match: {dateTime: {$gte: start.toDate(), $lte: end.toDate()}}},
        { $project: {_id: 0, content: 1} }
    ]).exec().then(function(events){
            //console.log(events);
            res.send(events)
        })
      .catch(next);
});

module.exports = router;
