const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number, required:true
    },
    id3:{
        type:Number, required:true
    },
    titre: { type: String, required:true},
    description: { type: String, required:true},
    garage:{type:String },
    titrej: { type: String, required:true},
    descriptionj: { type: String, required:true},
    prix: { type: Number, required:true},
    image:{ type: String, required:true},
    rdv:{type: Number},
 

},
{
    timestamps: true
}
);

module.exports = mongoose.model('description', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
