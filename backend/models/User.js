const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
       
    },
    contactno: {
        type: String,
        required: true,
    },
  
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});
/* /* Validate unique email */
// UserSchema.path('email').validate(async(email)=>{
//    const emailCount = await mongoose.models.user.countDocuments({email})
//    return !emailCount
// },'Email already Exists'); */


const User = mongoose.model('user', UserSchema);
module.exports = User;