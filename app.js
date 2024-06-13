require("dotenv").config();
require('./database/DB');
const monitor = require('./assets/monitor');

// Roya
// const engine = require('./api/engine/api.Roya');

// AlJazeera
const engine = require('./api/engine/api.AlJazeera');


monitor.setEngine(engine);
monitor.start();