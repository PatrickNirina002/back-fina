
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParticulierSchema = new Schema({
    _id:{
        type:Number
    },
    id2:{
        type:Number
    },
    
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    email: {
        type: String
    },
    telephone: {
        type: String
    },
   
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('client', ParticulierSchema);

module.exports = User;