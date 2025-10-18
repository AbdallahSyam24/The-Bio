const mongoose = require("mongoose");

const FaceSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "embedding": {
        type: [Number],
        required: true
    },
    "date": {
        type: Date,
        default: Date.now
    },
});

mongoose.model("face_embedded_data", FaceSchema);