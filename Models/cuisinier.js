const mongoose = require('mongoose');


const tchatSchema = mongoose.Schema({
  _id:Number,
  nom:  {
    type: String,
    required: true
},
  prenom:  {
    type: String,
    required: true
},
  email:  {
    type: String,
    required: true
},
 

}, {
  timestamps: true
});


  module.exports=mongoose.model('reserve',tchatSchema)