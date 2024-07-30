const amazon = require('../../services/Amazon/Amazon.controller');

const fetchPriceContent = async (page) => {
    return await page.evaluate(() => {

        const total = document.querySelectorAll('.apexPriceToPay')


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
    amazon.getLastPrice()
        .then(lastPrice => {
            if (lastPrice) {
                if (lastPrice.price != obj.price) {
                    amazon.create(obj);
                }
            } else {
                amazon.create(obj);
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