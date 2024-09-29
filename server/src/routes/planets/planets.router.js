const express = require('express');

const planetsRouter = express.Router();

planetRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;