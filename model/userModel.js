const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: { type: String },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    zipCode: { type: Number },
    phoneNumber: { type: Number },
    aboutMe: { type: String },

}, {
    timestamps: true
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;