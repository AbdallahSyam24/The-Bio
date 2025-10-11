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

module.exports = {
    containsHTMLTags,
    getEngine
}