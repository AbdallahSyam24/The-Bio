require('./Crypto.model');
const mongoose = require("mongoose");

const crypto = mongoose.model(process.env.CRYPTO_BITCOIN_COLLECTION);


const create = (fields) => {

    const response = {
        'status': 500
    }

    crypto.create(fields)
        .then(res => response.status = res._doc._id)
        .catch(e => response.status = e.message);

    return response;
}

const getLastPrice = async () => {
    return await crypto.findOne().select('price').sort({ _id: -1 }).exec();
}

module.exports = {
    create,
    getLastPrice
}