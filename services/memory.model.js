const mongoose = require("mongoose");

const memorySchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "type": {
        type: String,
        required: true
    },
    "url": {
        type: String,
        required: true
    },
    "date": {
        type: Date,
        default: Date.now
    },
});

mongoose.model("agent_memory", memorySchema);