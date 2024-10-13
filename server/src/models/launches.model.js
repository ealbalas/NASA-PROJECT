const axios = require('axios');

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
    success: true,
}

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v5/launches/query";

async function populateLaunches() {
    console.log("Downloading launch data...");
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
            {
                path: 'rocket',
                select: 'name'
            },
            {
                path: 'payloads',
                select: 'customers'
            }
        ]}
    })
    .then((response) => {
        const launchDocs = response.data.docs;
        for (const launchDoc of launchDocs) {
            const payloads = launchDoc['payloads'];
            const customers = payloads.flatMap((payload) => {
                return payload['customers'];
            });

            const launch = {
                flightNumber: launchDoc['flight_number'],
                mission: launchDoc['name'],
                rocket: launchDoc['rocket']['name'],
                launchDate: launchDoc['date_local'],
                upcoming: launchDoc['upcoming'],
                success: launchDoc['success'],
                customers: customers
            }
            console.log(`${launch.flightNumber} ${launch.mission}`);
        }
        // console.log(launchDocs);
    })
    .catch((error) => {
        console.error(error);
    });
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        mission: "FalconSat",
        rocket: "Falcon 1"
    });
    if (firstLaunch) {
        console.log('Launches are already loaded');
    } else {
        await populateLaunches();
    }
}

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
        customers: ['BO', 'SpaceX', 'NASA'],
        flightNumber: flightNumber,
        upcoming: true,
        success: true
    })

    await saveLaunch(newLaunch);
}

async function findLaunch(filter) {
    return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
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
    loadLaunchesData,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunch,
}