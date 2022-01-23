const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const { validation } = require('../utils/restResponse');
const tagController = require('../controller/tagController')

// For root route of tag controller
router.get('/', (req, res) => {
    res.send('READY');
});

// For fetch data from LinkPreview API and insert into DB
router.post('/fetchData',
    check('user_id', 'User id is missing').not().isEmpty(),
    check('url', 'URL is missing').not().isEmpty().isURL().trim(),
    check('tags', 'Tags must be an object').isObject()
    , (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send(validation(errors.array()));
        } else {
            tagController.fetchData(req, res);
        }
    });

module.exports = router;