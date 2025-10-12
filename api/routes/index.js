const express = require("express");
const routes = express.Router();


const monitor = require('../../assets/monitor');
const { getEngine } = require("../../assets/helper");
const { getMemory } = require("../controller/api.memory");


routes.route("/getLatest/:engine")
    .get(async (req, res) => {
        const engineName = req.params.engine;
        const engine = getEngine(engineName);

        if (engine.error) {
            return res.status(400).json({ error: engine.error });
        }

        monitor.setEngine(engine);
        const data = await monitor.start();

        const { title, type } = data[0];

        try {
            const result = await getMemory(title, type);
            if (result.result) {
                return res.status(200).json({ message: 'No new updates', data: [] });
            } else {
                return res.status(200).json({ data });
            }
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

module.exports = routes;