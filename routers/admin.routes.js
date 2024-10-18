const express = require('express');

const router = express.Router();

const { createworker, getAllworkers, updateworkerById, getworkerByfilter, getworkerById, DeactivateworkerById, checkUsername } = require('../controllers/admin');

const { isSignedIn, isAdmin, verify_X_API_KEY } = require('../middleware/auth');
const {  AdminType, login } = require('../controllers/auth');
const { getUserData, getUsersData } = require('../controllers/users');

const validateEmail = require('./../validator/email.validator')

const multer = require('multer');
const { change_password, forgetPassword } = require('../controllers/admin_auth');


const upload = multer({ storage: multer.memoryStorage() });


const authenticatedAdmin = [isSignedIn, isAdmin]


//// auth enpoints

router.post('/login', verify_X_API_KEY, login)
router.get('/usertype', verify_X_API_KEY, AdminType)
router.patch("/settings/password", verify_X_API_KEY, isSignedIn,change_password);

router.post('/forget/password', [verify_X_API_KEY, validateEmail, forgetPassword])
router.post('/reset/password/:token', verify_X_API_KEY,)
router.patch('/update/info', verify_X_API_KEY, authenticatedAdmin) //update admin bio by add mail

//// workers endpoints

router.post('/worker', verify_X_API_KEY, authenticatedAdmin, createworker) // create worker

router.get('/workers', verify_X_API_KEY, authenticatedAdmin, getAllworkers)  // get all workers 
router.get('/workers/:workerId', verify_X_API_KEY, authenticatedAdmin, getworkerById) // get a worker by workerId

router.patch('/worker/single/:workerId', verify_X_API_KEY, authenticatedAdmin, upload.single('profileImage'), updateworkerById) //update worker profile

router.patch('/worker/:workerId', verify_X_API_KEY, authenticatedAdmin, DeactivateworkerById) // deactivate a worker profile
router.get('/workers/workerType/', verify_X_API_KEY, authenticatedAdmin, getworkerByfilter) // get workers by filtering 

///// users endpoints

router.get('/users', verify_X_API_KEY, authenticatedAdmin, getUsersData)

// check if worker exists
router.get("/check-username", verify_X_API_KEY, isSignedIn, checkUsername);


module.exports = router;