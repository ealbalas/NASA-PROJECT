const launchesModel = require('../../models/launchs.model');

function getAllLaunches(req, res) {
    return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    launchesModel.addNewLaunch(launch)

    return res.status(201).json(launch);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}