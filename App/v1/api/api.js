var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users');
router.post('/login', UsersController.login);
router.get('/get', (req,res) => {
    res.send('Welcome!!');
})
module.exports = router;

