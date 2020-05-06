const mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    address: {type: String},
    name:{type: String},
    longitude:{type: Number},
    lattitude: {type: Number},
    openingHours: {type: String},
    userId: {type: String},
}, {
    timestamps: true
});

placeSchema.set('toJSON',{
    virtuals: true,
    versionKey: false
});

 var userModel =  mongoose.model('places',placeSchema);
 module.exports = userModel;