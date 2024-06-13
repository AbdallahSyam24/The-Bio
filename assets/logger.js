const fs = require('fs');
const utf8 = require('utf8');

const filename = process.env.LOG_FILE;

const write = (obj) => {
    obj = utf8.encode(JSON.stringify(obj));
    fs.writeFile(filename, obj, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Logged');
        }
    });
}


const getFromCache = async () => {
    try {
        const data = await fs.readFile(filename, 'utf8');
        console.log(data);
        // return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing the file', err);
        throw err;
    }
};

module.exports = {
    write,
    // getFromCache
}