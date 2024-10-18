const express = require('express')

const router = express.Router();

const { isSignedIn, isAdmin, validAccess, Allowworkers, verify_X_API_KEY } = require('../middleware/auth')

const { } = require('../controllers/worker');
const { getUserData, getUsersData } = require('../controllers/users');
const { login, AdminType } = require('../controllers/auth');

const authenticatedWorker = [isSignedIn, Allowworkers ]

//// auth

router.get('/usertype', verify_X_API_KEY, AdminType)
router.post('/login', verify_X_API_KEY, login)

//// users enpoints

router.get('/user/:Id',  verify_X_API_KEY, authenticatedWorker, getUserData)
router.get('/users',  verify_X_API_KEY, authenticatedWorker, getUsersData)




module.exports = router;