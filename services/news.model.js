const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "body": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    },
    "date": {
        type: Date,
        default: Date.now
    },
});

mongoose.model("news", newsSchema);