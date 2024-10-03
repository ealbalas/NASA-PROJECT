const PORT = process.env.PORT || 8000;

const http = require('http');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.models');

async function startServer() {
    await loadPlanetsData();
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();
