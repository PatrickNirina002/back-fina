const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    _id: {type:Number, required:true},
    id2:{
        type:Number, required:true
    },
    profil:{ type: String, required:true},

},
{
    timestamps: true
}
);

module.exports = mongoose.model('photo', UserSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
