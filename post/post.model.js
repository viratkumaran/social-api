var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema =new Schema({
      userName: {
        type : String
      },
      postName: {
        type : String
      },
      fileSource:{
        type : String
      },
      postImage:{
        type : String
      },
      datenow:{
        type : String
      },
      describe:{
        type : String
      },
      timenew:{
        type : String
      },
      productName:{
        type : String
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      isDeleted: {
          type: Boolean,
          default: false
      }
  
  })

  module.exports = mongoose.model('postscheduledetail', PostSchema);
