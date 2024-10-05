const launchesModel = require('../../models/launchs.model');

function getAllLaunches(req, res) {
    return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    const launch = req.body;
    console.log(launch);

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
    const launchId = req.params.id;

    if (!launchesModel.existsLaunchWithId()) {
        return res.status(404).json
    }

}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}