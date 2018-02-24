const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const options = {
        root: 'public/html'
    };
    const callback = (error) => {
        if (error) {
            throw new Error(error);
        }
    };
    res.sendFile('homework1/index.html', options, callback);
});

module.exports = router;
