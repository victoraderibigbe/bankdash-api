const express = require('express');

const { getAccountBaance, transfer, getAccountName, getTransactionHistory, myacctNo, getMyAccountName } = require('../controllers/transtaction');
const { verify_X_API_KEY } = require('../middleware/auth');
const { userIsSignedIn } = require('../middleware/auth.users');

const router = express.Router();

router.post('/transfer',  verify_X_API_KEY, userIsSignedIn, transfer)
router.get('/getAccountBalance', verify_X_API_KEY, userIsSignedIn, getAccountBaance)
router.get('/history',  verify_X_API_KEY, userIsSignedIn, getTransactionHistory)
router.get('/accountName',  verify_X_API_KEY, userIsSignedIn, getAccountName)
router.get('/my-acct-no', verify_X_API_KEY, userIsSignedIn, myacctNo)
router.get('/my-acct-name', verify_X_API_KEY, userIsSignedIn, getMyAccountName)



module.exports = router;