const puppeteer = require('puppeteer');

let engine = null;

const fetchNewsURLsData = async () => {
    console.log('********************************\nFetching URLs...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(engine.URL, { waitUntil: 'networkidle2' });
    const data = await engine.fetchNewsURLs(page);
    await browser.close();

    // console.log('Done fetching URLs');
    return data;
}

const getURLs = async () => {
    let urls = null;
    try {
        urls = await fetchNewsURLsData();
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }

    return urls;
}

const fetchNewsContentData = async (url) => {
    console.log('\nFetching News content...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await engine.fetchNewsContent(page);
    await browser.close();

    console.log('Done fetching news content');
    return data;
}

const getBody = async (urls = []) => {
    try {
        const resutls = [];
        let news = null;
        for (let i = 0; i < urls.length; i++) {
            news = await fetchNewsContentData(urls[i]);
            let obj = { ...news, 'url': urls[i] };
            resutls.push(obj);

            engine.insertNews(obj);

            // return resutls; // comment this to get latest 6 news
        }

        return resutls;

    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
}

const monitorData = async () => {
    return getURLs()
        .then(urls => getBody(urls))
        .catch(e => console.log(e));
}

const start = async () => {
    if (engine) {
        while (true) {
            // let data = await monitorData();
            // data = data[0];

            await monitorData();

            // Wait for a specific interval before checking again (1 hour)
            // await new Promise(resolve => setTimeout(resolve, 1800000));
            // (.25 hour)
            await new Promise(resolve => { setTimeout(resolve, 450000) });
        }
    } else {
        console.log('Please set an engine...');
    }
};

const setEngine = e => engine = e;

module.exports = {
    start,
    setEngine
}