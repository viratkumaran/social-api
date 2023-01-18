var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = 8000;
var path = require('path');
var router = require('./routes');
var bodyParser = require("body-parser")
const fs = require('file-system');
const FB =require('fb')
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


mongoose.connect('mongodb://localhost:27017/social-api');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("CONNECTED")
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE,OPTIONS');
  next();
});

app.use('/api',router);

app.get('/', function(req, res){
    console.log('app starting on port: '+port)
    res.send('the api was running');
});


app.post('/profile', upload.single('postImage'), function (req, res, next) {
  const tempPath = req.file.path;
  console.log("req---------",req.file);
  const targetPath = path.join(__dirname, "./uploads/" +req.file.originalname);

  if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
    console.log("if----------------")
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
      res.send({"suceess":"true"});
    });
  } else {
    console.log("else----------------")
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .send("Only .png files are allowed!");
    });
  }

})
app.use(express.static('public'))
app.use('/images', express.static('images'));
app.listen(port, function(){
    console.log('app listen on port: '+port);
});


// const http = require("http");
// const path = require("path");
// const fs = require("fs");
// var FB = require('fb');

// const express = require("express");

// const app = express();
// const httpServer = http.createServer(app);

// const PORT = process.env.PORT || 3000;

// httpServer.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
// app.use(function(req,res,next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE,OPTIONS');
//   next();
// });
// // put the HTML file containing your form in a directory named "public" (relative to where this script is located)
// app.get("/", express.static(path.join(__dirname, "./public")));
// const multer = require("multer");

// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "/uploaded/files"
//   // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });


// app.post(
//   "/upload",
//   upload.single("file" /* name attribute of <file> element in your form */),
//   (req, res) => {
//     console.log(req.body)
//   //   const tempPath = req.file.path;
//   //   const targetPath = path.join(__dirname, "./uploads/image.jpg");

//   //   if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
//   //     fs.rename(tempPath, targetPath, err => {
//   //       if (err) return handleError(err, res);

//   //       res
//   //         .status(200)
//   //         .contentType("text/plain")
//   //         .end("File uploaded!");
//   //     });
//   //   } else {
//   //     fs.unlink(tempPath, err => {
//   //       if (err) return handleError(err, res);

//   //       res
//   //         .status(403)
//   //         .contentType("text/plain")
//   //         .end("Only .png files are allowed!");
//   //     });
//   //   }
//   }
// );
// app.post("/fbupload",(req, res) => {

//   FB.setAccessToken('EAAGEfpXqtNABANTtGwg02BkWRNCcD9XUbyZB8jH8QZBz2cpkZCpCFurV1Qx6U7mSEYDm86F3BHtljDzHJerGqp9O1DJHTEcBFNZC8Lt1HvYI2aKE9QaZA6JGS623GFHwUVgv4KMiNfb8vsf0aEy0k34ObafuRuLfHNdPbqCI6V43m4LUBN0kYWg1MT6FWZBZCqAG4PqbEQ94AZDZD');
// console.log(req.query,req.body)
//   var body = 'My first post using facebook-node-sdk';
//   return false
//   FB.api('104901995709038/photos', 'post', { source: fs.createReadStream('./uploads/image.jpg'), caption: 'balaji' }, function (res) {
//     if(!res || res.error) {
//       console.log(!res ? 'error occurred' : res.error);
//       return;
//     }else{
//       console.log('Post Id: ' + res.post_id);

//     }
//   });
//   })
 
