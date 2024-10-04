const launchesModel = require('../../models/launchs.model');

function getAllLaunches(req, res) {
    return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res) {
    return res.status(200).json(launchesModel.addNewLaunch());
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}