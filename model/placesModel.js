const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
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

module.exports =  mongoose.model('places',placeSchema);