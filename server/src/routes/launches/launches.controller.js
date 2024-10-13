const launchesModel = require('../../models/launches.model');

async function getAllLaunches(req, res) {
    return res.status(200).json(await launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    const launch = req.body;
    // console.log(launch);

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid date entered",
        });
    }

    launchesModel.addNewLaunch(launch);

    return res.status(201).json(launch);
}

function deleteLaunch(req, res) {
    const launchId = +req.params.id;

    if (!launchesModel.existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    } 
    
    const aborted = launchesModel.abortLaunch(launchId);
    return res.status(200).json(aborted);
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
}