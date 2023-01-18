var jwt = require('jsonwebtoken'); 
var config = require('../config'); 

function verifyToken(req, res, next) {

if(!req.headers['authorization'])
return res.status(400).send({ auth:false, message: ' token is invalid',status:400});

  var bearerHeader = req.headers['authorization'];
  console.log(req.headers,">>>hhhh")
  
  console.log(bearerHeader,">>>lll")
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];



  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' ,status:403});
  

  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.',status:500 }); 
      
  
console.log(decoded,"drere")
    req.userId = decoded.id;
  
    console.log("token verified")
    next();
  });

}



module.exports = verifyToken;