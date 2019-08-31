const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number, required:true
    },
    matricule: { type: String, required:true},
    nom_pro: { type: String, required:true},
    type_rep: { type: String, required:true},
    prix:{ type: Number, required:true}

},
{
    timestamps: true
}
);

module.exports = mongoose.model('gerer', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
