var express = require('express');

var router = express.Router();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

var User = require('../model/User');


var jwt = require('jsonwebtoken'); 
var bcrypt = require('bcryptjs');
var config = require('../config'); 


router.post('/login', function(req, res) {

  User.findOne({ name: req.body.username }, function (err, user) {
    if (err) return res.status(500).send({message:'Error on the server.',status:500});
    if (!user) return res.status(404).send({message:'No user found.',status:404});
    
   
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false,status:401, token: null });

    
    var token = jwt.sign({ id: user._id }, config.secret, {
      // expiresIn: 86400 
      expiresIn: "6d"
    });

    res.status(200).send({ auth: true, token: token ,status:200});
  });

});



router.post('/register', function(req, res) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send({message:"There was a problem registering the user`.",status:500});

   
    var token = jwt.sign({ id: user._id }, config.secret, {
      // expiresIn: 86400 
      expiresIn: "60s"
    });

    res.status(200).send({ auth: true, token: token,status:200 });
  });

});



module.exports = router;