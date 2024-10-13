const mongoose = require('mongoose');
const URL = "mongodb+srv://nasa-api:1234@nasacluster.jnyam.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster";

mongoose.connection.once('open', () => {
    console.log('MongoDB conncection ready!');
});

mongoose.connection.on('error', (err) => {
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