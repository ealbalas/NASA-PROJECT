const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 999,
    },
    launchDate: {
        type: Date,
        requried: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customers:{
        type: [ String ],
        required: true,
    },
    upcoming: {
        type: Boolean,
        requred: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = mongoose.model('Launch', launchesSchema);