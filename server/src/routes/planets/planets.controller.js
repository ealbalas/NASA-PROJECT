const planetsModel = require('../../models/planets.models')

function getAllPlanets(req, res) {
    return res.status(200).json(planetsModel.getAllPlanets());
}

module.exports = {
    getAllPlanets,
}