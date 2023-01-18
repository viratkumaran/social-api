var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhoneDetailSchema =new Schema({
    mobileName: {
        type : String,
        
    },
    mobileModel: {
        type : String,
       
    },

  color:{
    type : String,
  },
RAM:{
    type : String,
  },
   

    stock: {
        type: String,
        enum : ['IN', 'OUT']
    },
    additionalspecification:{
      type :Array,
    },
     
   
    
    isDeleted: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('PhoneDetail', PhoneDetailSchema);