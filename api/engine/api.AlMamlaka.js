const almamlaka = require('../../services/AlMamlaka/AlMamlaka.controller');
const { getDataURL } = require('../api.poster');

const URL = 'https://www.almamlakatv.com/categories/12-%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85';

const fetchNewsURLs = async (page) => {
    return await page.evaluate(() => {
        return [...document.querySelectorAll('.mtv-section .story a')]
            .map(a => a.href);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        const containsHTMLTags = (str) => {
            const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
            return htmlTagPattern.test(str);
        }
        return {
            'title': [...document.querySelectorAll('.article-title')]
                .filter(str => !containsHTMLTags(str.innerHTML))
                .map(title => title.innerHTML)[0],
            'body': [...document.querySelectorAll('.article-body p')]
                .filter(p => !containsHTMLTags(p.innerHTML))
                .map(body => body.innerHTML)
                .join(" ")
                .toString()
        };
    });
}

const insertNews = async (obj) => {
    const dataURL = await getDataURL(obj.title);
    console.log(obj);
    obj = { ...obj, dataURL };

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