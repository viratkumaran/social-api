var express = require('express');
var route = express.Router();
var controller = require('./post.control');

var auth = require('../auth/VerifyToken')



route.post('/fbupload',auth,controller.fbpost);
route.post('/fbuploadsch',auth,controller.fbpostsche);
route.post('/instaupload',auth,controller.instapost);
route.put('/getfbuploadsch',auth,controller.getpost);
route.post('/linkedinupload',auth,controller.linkedInPost);
module.exports = route;