const alarabiya = require('../../services/AlArabiya/AlArabiya.controller');
const { getDataURL } = require('../api.poster');
const { containsHTMLTags } = require('../../assets/helper');

const URL = 'https://www.alarabiya.net/latest-news';

const fetchNewsURLs = async (page) => {
    await page.screenshot({ path: 'test.png' })
    return await page.evaluate(() => {
        return [...document.querySelectorAll('.sectionHero_thumb .sectionHero_latest .sectionHero_element ')]
            .map(a => a.innerHTML);
    });
}

const fetchNewsContent = async (page) => {
    return await page.evaluate(() => {
        return {
            'title': [...document.querySelectorAll('.headingInfo_title')]
                .map(title => title.innerHTML)[0].trim(),
            'body': [...document.querySelectorAll('#body-text .paragraph')]
                .map(body => body.innerHTML.replaceAll(/<\/?[^>]+(>|$)/gi, ""))
                .join(" ")
                .trim()
        };
    });
}

const insertNews = async (obj) => {
    const dataURL = await getDataURL(obj.title);
    obj = { ...obj, dataURL };

    alarabiya.getLastTitle()
        .then(lastTitle => {
            if (lastTitle) {
                if (lastTitle.title != obj.title) {
                    alarabiya.create(obj);
                }
            } else {
                alarabiya.create(obj);
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