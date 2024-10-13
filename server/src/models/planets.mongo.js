const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        requried: true,
    },
});

module.exports = mongoose.model('Planet', planetsSchema);