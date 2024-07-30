const crypto = require('../../services/Crypto/Crypto.controller');

const fetchPriceContent = async (page) => {
    return await page.evaluate(() => {

        const total = document.querySelectorAll('#sdp-market-price');

        console.log('dasdasdsad');


        console.log('total' + total);

        return;


        return {
            'currncy': [...document.querySelectorAll('.a-price-symbol')]
                .map(c => c.innerHTML)[0],
            'price': parseFloat([...document.querySelectorAll('.apexPriceToPay')]
                .map(price => price.innerHTML)[0])
        };
    });
}

const insertPrice = async (obj) => {
    crypto.getLastPrice()
        .then(lastPrice => {
            if (lastPrice) {
                if (lastPrice.price != obj.price) {
                    crypto.create(obj);
                }
            } else {
                crypto.create(obj);
            }
        })
        .catch(e => {
            throw e;
        });
}

module.exports = {
    fetchPriceContent,
    insertPrice
}