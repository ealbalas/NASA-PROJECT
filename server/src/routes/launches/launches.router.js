const express = require('express');
const { 
    getAllLaunches,
    addNewLaunch,
    deleteLaunch,
 } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunch);
launchesRouter.delete('/:id', deleteLaunch);

module.exports = launchesRouter;