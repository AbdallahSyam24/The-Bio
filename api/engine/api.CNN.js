const cnn = require('../../services/CNN/CNN.controller');
const { getDataURL } = require('../api.poster');
const { containsHTMLTags } = require('../../assets/helper');

const URL = 'https://www.cnn.com/world';

const fetchNewsURLs = async (page) => {
    return await page.evaluate(() => {
        return [...document.querySelectorAll('.layout__wrapper .container_lead-plus-headlines__cards-wrapper .container__link--type-article')]
            .map(a => a.href);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        return {
            'title': [...document.querySelectorAll('#maincontent')]
                .map(title => title.innerHTML)[0].trim(),
            'body': [...document.querySelectorAll('.article__main .paragraph')]
                .map(body => body.innerHTML.replaceAll(/<\/?[^>]+(>|$)/gi, ""))
                .join(" ")
                .trim()
        };
    });
}

const insertNews = async (obj) => {
    const dataURL = await getDataURL(obj.title);
    obj = { ...obj, dataURL };

    cnn.getLastTitle()
        .then(lastTitle => {
            if (lastTitle) {
                if (lastTitle.title != obj.title) {
                    cnn.create(obj);
                }
            } else {
                cnn.create(obj);
            }
        })
        .catch(e => {
            throw e;
        });
}

module.exports = {
    URL,
    fetchNewsURLs,
    fetchNewsContent,
    insertNews
}