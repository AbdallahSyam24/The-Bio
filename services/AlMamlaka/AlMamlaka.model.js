const mongoose = require("mongoose");

const AlMamlakaSchema = mongoose.Schema({
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

mongoose.model(process.env.ALMAMLAKA_COLLECTION, AlMamlakaSchema);