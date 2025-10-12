require('../../services/memory.model');
const mongoose = require("mongoose");
const memory = mongoose.model("agent_memory");


const getMemory = async (title, type) => {
    try {
        const existing = await memory.findOne({ type });

        if (existing) {
            existing.title = title;
            await existing.save();
            return { result: true };
        } else {
            const newDoc = new memory({ title, type });
            await newDoc.save();
            return { result: false };
        }
    } catch (err) {
        console.error('MongoDB operation failed:', err);
        throw err;
    }
}

module.exports = {
    getMemory
}