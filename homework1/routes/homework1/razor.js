const express = require('express');
const router = express.Router();
const TextRazorApiCaller = require('../../utils/homework1/text-razor-api-caller');

const textRazor = new TextRazorApiCaller();

router.post('/', function (request, response) {
    const text = request.body.data;
    textRazor
        .getTextHyperlinks(text)
        .then((result) => response.end(JSON.stringify(result)))
        .catch((console.error));
});

module.exports = router;
