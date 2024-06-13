const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

// mongoose.connection.on("connected", () => {
//     console.log("DB connected");
// });

mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
});

mongoose.connection.on("error", (e) => {
    console.log("Mongoose error", e);
});