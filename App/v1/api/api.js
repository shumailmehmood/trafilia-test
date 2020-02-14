var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users');
const SalaryController =require('../controllers/salary');
const Transaction=require("../controllers/transaction");
//-----------------POST Requests------------------//
router.post('/login', UsersController.login);
router.post('/register', UsersController.Register,SalaryController.salaryReg);
router.post('/transaction/:id', Transaction.transactionPost,SalaryController.salaryUpdate);
//-----------------GET Requests------------------//
router.get('/get_all_users', UsersController.getUsers);

router.get('/get', (req,res) => {
    res.send('Welcome!!');
})
module.exports = router;

