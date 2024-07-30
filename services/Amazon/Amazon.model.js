const mongoose = require("mongoose");

const AmazonSchema = mongoose.Schema({
    "url": {
        type: String,
        required: true
    },
    "currncy": {
        type: String,
        required: false
    },
    "price": {
        type: Number,
        required: true
    },
    "date": {
        type: Date,
        default: Date.now
    },
});

mongoose.model(process.env.AMAZON_COLLECTION, AmazonSchema);