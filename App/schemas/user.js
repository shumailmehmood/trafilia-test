const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

},{
    timestamps:true
});
userSchema.methods.generateToken = function () {
    const token = (jwt.sign({ id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, process.env.JWT_PVT_KEY));
    return token;
}
module.exports = mongoose.model('User', userSchema);
