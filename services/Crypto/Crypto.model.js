const mongoose = require("mongoose");

const BitCoinSchema = mongoose.Schema({
    "source": {
        type: String,
        required: true
    },
    "currncy": {
        type: String,
        required: true
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

mongoose.model(process.env.CRYPTO_BITCOIN_COLLECTION, BitCoinSchema);