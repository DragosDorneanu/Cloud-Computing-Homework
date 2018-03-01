const TextRazor = require('textrazor');
const config = require('./config');

function TextRazorApiCaller() {
    const textRazor = new TextRazor(config.apiKey);
    const options = {extractors: 'entities'};

    this.getTextHyperlinks = function (text, customOptions) {
        return new Promise((resolve, reject) => {
            if (!customOptions) {
                customOptions = options;
            }
            textRazor
                .exec(text, options)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
}

module.exports = TextRazorApiCaller;
