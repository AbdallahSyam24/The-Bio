require('./Amazon.model');
const mongoose = require("mongoose");

const news = mongoose.model(process.env.AMAZON_COLLECTION);


const create = (fields) => {

    const response = {
        'status': 500
    }

    news.create(fields)
        .then(res => response.status = res._doc._id)
        .catch(e => response.status = e.message);

    return response;
}

const getLastPrice = async () => {
    return await news.findOne().select('price').sort({ _id: -1 }).exec();
}

const getLatest = async () => {
    return await news.findOne().sort({ _id: -1 }).exec();
}

module.exports = {
    create,
    getLastPrice,
    getLatest
}