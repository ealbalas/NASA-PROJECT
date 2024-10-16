const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB conncection ready!');
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

mongoose.connection.once('close', () => {
    console.log('MongoDB connection closed!');
});

async function mongoConnect() {
    await mongoose.connect(URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,    
};