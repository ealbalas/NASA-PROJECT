const launchesModel = require('../../models/launchs.model');

function getAllLaunches(req, res) {
    return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
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

module.exports = {
    getAllLaunches,
    addNewLaunch,
}