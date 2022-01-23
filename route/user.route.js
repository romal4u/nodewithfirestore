const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const {validation } = require('../utils/restResponse');
const userController = require('../controller/userController');

// Route for create new user
router.post('/create',
    check('email', 'Invalid email address').isEmail().normalizeEmail(),
    check('name', 'Invalid name').not().isEmpty().trim().escape(),
    check('phone_number', 'Invaid phone number').not().isEmpty().isNumeric().trim().escape()
    , (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send(validation(errors.array()));
        } else {
            userController.createUser(req, res);
        }
    });

// Route for get all users
router.get('/', userController.getAllUsers);

// Route for get user by id
router.get('/:userId', userController.findById);

// Route for update user data
router.post('/update/:userId',
    check('email', 'Invalid email address').isEmail().normalizeEmail(),
    check('name', 'Name is missing').not().isEmpty().trim().escape(),
    check('phone_number', 'Phone number is missing').not().isEmpty().trim().escape()
    , (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send(validation(errors.array()));
        } else {
            userController.updateUser(req, res);
        }
    });

// Route for delete user
router.get('/delete/:userId', userController.deleteUser);

module.exports = router;