// const app = require("./app");
// const mongoose = require("mongoose");
// const fs = require('file-system');
// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const path = require("path");

// process.on("uncaughtException", (err) => {
//     console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
//     console.log(err.message, err.name);
//     process.exit(1);
// });
  
// const DB = "mongodb://localhost:27017/node-multer";
  
// const MongoClient = require('mongodb').MongoClient
// const myurl = 'mongodb://localhost:27017';
 
// MongoClient.connect(myurl, (err, client) => {
//   if (err) return console.log(err)
//   db = client.db('test') 
// })
//   mongoose
//     .connect(DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       autoIndex: true,
//     })
//     .then(() => {
//       console.log("DB connected successfully");
//     });
  
  // const port = 8080;
  
//   app.post('/profile', upload.single('postImage'), function (req, res, next) {
//     const tempPath = req.file.path;
//     console.log("req---------",req.file);
//     const targetPath = path.join(__dirname, "./uploads/" +req.file.originalname);

//     if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
//       console.log("if----------------")
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);
//         res.send({"suceess":"true"});
//       });
//     } else {
//       console.log("else----------------")
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .send("Only .png files are allowed!");
//       });
//     }
//   //   var img = fs.readFileSync(req.file.path);
//   //   var encode_image = img.toString('base64');
//   //   var finalImg = {
//   //       contentType: req.file.mimetype,
//   //       image: Buffer.from(encode_image, 'base64')
//   //   };
//   // db.collection('myCollection').insertOne(finalImg, (err, result) => {
//   //       console.log(result)
//   //       if (err) return console.log(err)
//   //       console.log('saved to database');
//   //       res.send("thank you");
//   //   })
// })

 