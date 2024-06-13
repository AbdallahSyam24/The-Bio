const { fabric } = require('fabric');
const { JSDOM } = require('jsdom');
const utf8 = require('utf8');

const getDataURL = (title) => {

    utf8.encode(title);
    const canvas = new fabric.Canvas(null, { width: 1080, height: 1080 });
    const rect = new fabric.Rect({ width: 1080, height: 1080, fill: '#f33' });
    const shadow = new fabric.Rect({ width: 1080, height: 270, fill: '#888888', opacity: 0.6 });
    const text = new fabric.Text(title, {
        fontSize: 50,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',

    });

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const textHeight = text.height;
    const shadowHeight = shadow.height;
    const maxWidth = 1000;
    const textWidth = text.width;
    if (shadow > maxWidth) {
        let scaleFactor = maxWidth / textWidth;
        text.scaleX = scaleFactor;
    }

    shadow.set({
        top: canvasHeight - shadowHeight,
    });

    text.set({
        left: canvasWidth / 2,
        top: canvasHeight - shadowHeight + 68,
    });


    canvas.add(rect, shadow, text);
    canvas.renderAll();

    return dataUrl = canvas.toDataURL('image/png');


}

const generateImg = (dataURL) => {

    const dom = new JSDOM();
    const download = dom.window.document.createElement('a');
    download.href = dataURL;
    download.download = 'test.png';
    download.click();
}

module.exports = {
    getDataURL
}