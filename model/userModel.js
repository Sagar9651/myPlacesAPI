const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String },
    emailId: { type: String, required: true },
    password: { type: String },
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

module.exports = mongoose.model('User', userSchema);