const puppeteer = require('puppeteer');

let engine = null;

const logger = require('./logger');

const fetchNewsURLsData = async () => {
    console.log('********************************\nFetching URLs...');
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
            "--single-process"
        ],
    });
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
        urls = urls.slice(0, 1);
        
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }

    return urls;
}

const fetchNewsContentData = async (url) => {
    console.log('\nFetching News content...');
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--no-zygote",
            "--single-process"
        ],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await engine.fetchNewsContent(page);
    await browser.close();

    console.log('Done fetching news content');
    return data;
}

const getBody = async (urls = []) => {
    try {
        const results = [];
        let news = null;
        for (let i = 0; i < urls.length; i++) {
            news = await fetchNewsContentData(urls[i]);
            let obj = { ...news, 'url': urls[i] };
            results.push(obj);

            engine.insertNews(obj);
        }

        return results;

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
        const data = await monitorData();
        return data;
    } else {
        console.log('Please set an engine...');
    }
}

const setEngine = e => engine = e;


const amazon = async (url) => {
    try {
        engine = require('../api/engine/api.Amazon');

        console.log('\nFetching Amazon price...');
        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--no-zygote",
                "--single-process"
            ],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const data = await engine.fetchPriceContent(page);
        // console.log(data);

        await browser.close();
        // engine.insertPrice({ ...data, 'url': url });
    } catch (error) {
        console.log(error);
    }
}


const crypto = async (url) => {
    try {
        engine = require('../api/engine/api.crypto');

        console.log('\nFetching crypto price...');
        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--no-zygote",
                "--single-process"
            ],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const data = await engine.fetchPriceContent(page);
        // console.log(data);

        await browser.close();
        // engine.insertPrice({ ...data, 'url': url });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    start,
    setEngine,
    amazon,
    crypto
}