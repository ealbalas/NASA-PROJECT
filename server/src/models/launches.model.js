const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

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

async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .findOne({})
        .sort('-flightNumber');
    
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    try {
        const planet = await planets.findOne({
            keplerName: launch.target,
        });

        if (!planet) {
            throw new Error('No matching planet found');
        }

        await launches.findOneAndUpdate({
            flightNumber : launch.flightNumber,
            }, launch, {
                upsert: true,
            });
    } catch(err) {
        console.log(`Could not save launch ${err}`);
    }
}

async function scheduleNewLaunch(launch) {
    const flightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        customer: ['BO', 'SpaceX', 'NASA'],
        flightNumber: flightNumber,
        upcoming: true,
        sucess: true
    })

    await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId,
    });
}

async function abortLaunch(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunch,
}