const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

// const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['BO', 'SpaceX', 'NASA'],
    upcoming: true,
    sucess: true,
}

saveLaunch(launch);

async function getAllLaunches() {
    return Array.from(await launches.find({}, {
        _id: 0,
        __v: 0,
    }));
}

async function saveLaunch(launch) {
    try {
        const planet = await planets.findOne({
            keplerName: launch.target,
        });

        if (!planet) {
            throw new Error('No matching planet found');
        }

        await launches.updateOne({
            flightNumber : launch.flightNumber,
            }, launch, {
                upsert: true,
            });
    } catch(err) {
        console.log(`Could not save launch ${err}`);
    }
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        customer: ['BO', 'SpaceX', 'NASA'],
        flightNumber: latestFlightNumber,
        upcoming: true,
        sucess: true
    }));
}

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function abortLaunch(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.sucess = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunch,
}