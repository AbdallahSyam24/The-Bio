const containsHTMLTags = (str) => {
    const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
    return htmlTagPattern.test(str);
}

// factory function to get the engine based on user input
const getEngine = (engine) => {
    switch(engine) {
        case 'roya':
            engine = require('../api/engine/api.Roya');
            break;
        case 'aljazeera':
            engine = require('../api/engine/api.AlJazeera');
            break;
        case 'almamlaka':
            engine = require('../api/engine/api.AlMamlaka');
            break;
        case 'cnn':
            engine = require('../api/engine/api.CNN');
            break;
        case 'alarabiya':
            engine = require('../api/engine/api.AlArabiya');
            break;
        default:
            return { error: 'Invalid engine specified' };
    }
    return engine;
}

const cleanText = (str) => {
    if (!str) return '';

    return str
        .replace(/<\/?[^>]+(>|$)/gi, "")
        .replaceAll('&nbsp;', ' ')
        .replaceAll('\\', '')
        .replaceAll('\n', ' ')
        .replaceAll('\r', ' ')
        .replaceAll('"', '`')
        .replaceAll("'", '`')
        .replace(/\s\s+/g, ' ')
        .trim();
};

module.exports = {
    containsHTMLTags,
    getEngine,
    cleanText
}