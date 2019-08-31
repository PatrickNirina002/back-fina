const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number, required:true
    },
    name: { type: String, required:true},
    prenom: { type: String, required:true},
    email: { type: String, required:true},
    description: { type: String},
    lieu: { type: String, required:true},
    contact: { type: String, required:true},
    garage: { type: String, required:true},
    pho:{ type: String},
    image:{ type: String},

},
{
    timestamps: true
}
);

module.exports = mongoose.model('prof', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
