require("dotenv").config();
require('./database/DB');
const monitor = require('./assets/monitor');

// Roya
const engine = require('./api/engine/api.Roya');

// AlJazeera
// const engine = require('./api/engine/api.AlJazeera');

// AlMamlaka
// const engine = require('./api/engine/api.AlMamlaka');

// CNN
// const engine = require('./api/engine/api.CNN');

// AlArabiya
// const engine = require('./api/engine/api.AlArabiya');


monitor.setEngine(engine);
monitor.start();

// const productURL = 'https://www.amazon.com/Herou-Summer-Casual-Flared-Medium/dp/B01M1IDFXV/ref=sr_1_2?_encoding=UTF8&content-id=amzn1.sym.be92e076-4e03-4c45-9995-b2497e7ba740&dib=eyJ2IjoiMSJ9.FZ_YXn-QmIyqS1B-_xFqWzwcBKaXZvjInj2XCDYZlEtiBeQSemq_PE9lq4JNTcqFU-3Q3s80lxPp6eIk5vBpCu3ZUN16pbptnNzwrj6DQzI8H_41YzbBSbO9E9Bgl6cFG9wQEUWJl3D24bQ7JyYkrYxZhlepP2OswxFeOQEAZ5CZ5rPjGap7m5d_7vXG4E54hRejJKO8rUVrpASiTyV65VyY8QHMYbAjeZNj6FXTAEgv0SXvt7_hLBLK1hx21AZtrpKGSxgQEx2kCZUM18xAPx1d9xuB4NVPZDjh_839CTI.tq4P0C73floYgOw5niw1WjJoYuOlVvmhBnsUGvvZj4U&dib_tag=se&pd_rd_r=40cec4a4-d380-4a1d-8d06-360e106e6cfa&pd_rd_w=24R4X&pd_rd_wg=XrEyX&pf_rd_p=be92e076-4e03-4c45-9995-b2497e7ba740&pf_rd_r=77AQFNWWXS83TVKRVJM8&qid=1718574196&refinements=p_n_deal_type%3A23566065011c&s=apparel&sr=1-2';
// monitor.amazon(productURL);

// const bitcoinURL = 'https://robinhood.com/crypto/BTC';
// monitor.crypto(bitcoinURL);