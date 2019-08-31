
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParticulierSchema = new Schema({
    _id:{
        type:Number
    },
    id2:{
        type:Number
    },
    id3:{
        type:Number
    },
    matricule: {
        type: String
    },
    nom:{
        type:String
    },
    tel: {
        type: String
    },
    titre:{
        type:String
    },

    datej: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('rendre', ParticulierSchema);

module.exports = User;