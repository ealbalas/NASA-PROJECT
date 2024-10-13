const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.models');
const { error } = require('console');

const PORT = process.env.PORT || 8000;
const URL = "mongodb+srv://nasa-api:1234@nasacluster.jnyam.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster";
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB conncection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(error);
});


async function startServer() {
    await mongoose.connect(URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();
