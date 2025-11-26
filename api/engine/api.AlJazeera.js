const aljazeera = require('../../services/AlJazeera/AlJazeera.controller');

const URL = 'https://www.aljazeera.net/news/';

const fetchNewsURLs = async (page) => {
    return await page.evaluate(() => {
        return [...document.querySelectorAll('a')]
            .filter(a => a.classList.contains('u-clickable-card__link'))
            .map(a => a.href);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        return {
            'title': [...document.querySelectorAll('.article-header h1')]
                .map(title => title.innerHTML.replaceAll(/<\/?[^>]+(>|$)/gi, ""))[0].trim(),
            'body': [...document.querySelectorAll('.wysiwyg  p')]
                .map(body => body.innerHTML.replaceAll(/<\/?[^>]+(>|$)/gi, ""))
                .map(body => body.replaceAll('&nbsp;', ' '))
                .join(" ")
                .trim(),
            'type': 'aljazeera'
        };
    });
}

const insertNews = async (obj) => {
    aljazeera.getLastTitle()
        .then(lastTitle => {
            if (lastTitle) {
                if (lastTitle.title != obj.title) {
                    aljazeera.create(obj);
                }
            } else {
                aljazeera.create(obj);
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