const launchesModel = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function getAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
    const launches = await launchesModel.getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function addNewLaunch(req, res) {
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

    await launchesModel.scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

async function deleteLaunch(req, res) {
    const launchId = +req.params.id;
    const exists = await launchesModel.existsLaunchWithId(launchId);
    if (!exists) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    } 
    
    const aborted = await launchesModel.abortLaunch(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted",
        });
    }
    return res.status(200).json({
        ok: true,
    });
}


module.exports = {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
}