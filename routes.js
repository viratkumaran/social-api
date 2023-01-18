var express = require('express');
var route = express.Router();


route.use('/post', require('./post'));
route.use('/auth',require('./auth/AuthController'))
route.use(express.static('public'))
route.use('/images', express.static('uploads'));
module.exports = route;