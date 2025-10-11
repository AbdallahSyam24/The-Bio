const express = require("express");
const routes = express.Router();
const monitor = require('../../assets/monitor');
const { getEngine } = require("../../assets/helper");

routes.route("/getLatest/:engine")
.get(async (req, res) => {
    const engineName = req.params.engine;
    const engine = getEngine(engineName);

    if (engine.error) {
        return res.status(400).json({ error: engine.error });
    }

    monitor.setEngine(engine);
    data = await monitor.start();

    res.status(200).json({ data });
})



module.exports = routes;