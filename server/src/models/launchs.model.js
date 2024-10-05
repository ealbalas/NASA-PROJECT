const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['BO', 'SpaceX', 'NASA'],
    upcoming: true,
    sucess: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
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


module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
}