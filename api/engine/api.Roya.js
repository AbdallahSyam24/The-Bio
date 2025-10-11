const roya = require('../../services/Roya/Roya.controller');

const URL = 'https://royanews.tv/section/9';

const fetchNewsURLs = async (page) => {
    return await page.evaluate(() => {
        return [...document.querySelectorAll('.news_card_small .news_card_small_title a')]
            .map(a => a.href);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        return {
            'title': [...document.querySelectorAll('.news_body .news_main_title_mob h1')]
                .map(title => title.innerHTML)[0],
            'body': [...document.querySelectorAll('.Newsbody p')]
                .map(body => body.innerHTML)
                .join(" ")
                .toString()
        };
    });
}

const insertNews = async (obj) => {
    roya.getLastTitle()
        .then(lastTitle => {
            if (lastTitle) {
                if (lastTitle.title != obj.title) {
                    roya.create(obj);
                }
            } else {
                roya.create(obj);
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