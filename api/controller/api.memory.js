require('../../services/memory.model');
const mongoose = require("mongoose");
const memory = mongoose.model("agent_memory");


const getMemory = async (title, type, url) => {
    try {
        const existing = await memory.findOne({ type });

        if (existing) {
            if (existing.url != url) {
                existing.title = title;
                existing.url = url;
                await existing.save();
                return { result: false };
            }

            return { result: true };
        } else {
            const newDoc = new memory({ title, type, url });
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