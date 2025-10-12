require('../../services/news.model');
const mongoose = require("mongoose");
const news = mongoose.model("news");


const insertNews = async (req, res) => {
    const { title, body, type } = req.body;
    if (!title || !body || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newNews = new news({ title, body, type });
        await newNews.save();
        return res.status(201).json({ message: 'News added successfully', data: newNews });
    } catch (err) {
        console.error('MongoDB operation failed:', err);
        throw err;
    }
}

module.exports = {
    insertNews
}