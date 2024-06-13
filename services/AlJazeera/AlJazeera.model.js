const mongoose = require("mongoose");

const AlJazeeraSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "body": {
        type: String,
        required: true
    },
    "url": {
        type: String,
        required: true
    },
    "dataURL": {
        type: String,
        required: false
    },
    "date": {
        type: Date,
        default: Date.now
    },
});

mongoose.model(process.env.ALJAZEERA_COLLECTION, AlJazeeraSchema);