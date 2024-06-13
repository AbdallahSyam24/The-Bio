const roya = require('../../services/Roya/Roya.controller');
const { getDataURL } = require('../api.poster');

const URL = 'https://royanews.tv';

const fetchNewsURLs = async (page) => {
    const urls = await page.evaluate(() => {
        const highlighteNews = document.querySelector('.highlighted_news');
        return [...document.querySelectorAll('a')]
            .filter(a => a.compareDocumentPosition(highlighteNews) & Node.DOCUMENT_POSITION_PRECEDING)
            .map(a => a.href);
    });

    const data = [];

    for (let i = 0; i < 12; i++) {
        if (i % 2 === 0) {
            data.push(urls[i]);
        }
    }

    return data;
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        const containsHTMLTags = (str) => {
            const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
            return htmlTagPattern.test(str);
        }
        return {
            'title': [...document.querySelectorAll('.inner_title')]
                .map(title => title.innerHTML)[0],
            'body': [...document.querySelectorAll('#readMore_text p')]
                .filter(p => !containsHTMLTags(p.innerHTML))
                .map(body => body.innerHTML)
                .join(" ")
                .toString()
        };
    });
}

const insertNews = async (obj) => {
    const dataURL = await getDataURL(obj.title);
    obj = { ...obj, dataURL };

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