const almamlaka = require('../../services/AlMamlaka/AlMamlaka.controller');

const URL = 'https://www.almamlakatv.com/categories/12-%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85';

const fetchNewsURLs = async (page) => {
    return await page.evaluate(() => {
        return [...document.querySelectorAll('.mtv-section .story a')]
            .map(a => a.href);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        return {
            'title': [...document.querySelectorAll('.article-title')]
                .map(title => cleanText(title.innerHTML))[0],
            'body': [...document.querySelectorAll('.article-body p')]
                .map(body => cleanText(body.innerHTML))
                .join(" ")
                .trim(),
            'type': 'almamlaka'
        };
    });
}

const insertNews = async (obj) => {
    almamlaka.getLastTitle()
        .then(lastTitle => {
            if (lastTitle) {
                if (lastTitle.title != obj.title) {
                    almamlaka.create(obj);
                }
            } else {
                almamlaka.create(obj);
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