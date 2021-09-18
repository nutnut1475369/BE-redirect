'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redirectURL = require('./logic/redirectURL');

var _redirectURL2 = _interopRequireDefault(_redirectURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = _express2.default.Router();
var ob = new _redirectURL2.default();
Route.use('/', _express2.default.static('public'));
Route.get('/getURL', async function (req, res) {
    var statData = await ob.getURLstat();
    console.log(statData);
    res.send(statData);
});
Route.post('/newURL', async function (req, res) {
    var short = await ob.newURL(req.body.url);
    res.send('127.0.0.1:3000/r/' + short);
});
Route.post('/updateStat', async function (req, res) {
    var _req$body = req.body,
        objectID = _req$body.objectID,
        newData = _req$body.newData;

    res.send((await ob.updateCase(objectID, newData)));
});
Route.get('/r/:url', async function (req, res) {
    var realURL = await ob.getURL(req.params.url);
    console.log(realURL);
    if (realURL === null) {
        res.send("not found");
    } else {
        res.redirect(realURL.url);
    }
});

exports.default = Route;