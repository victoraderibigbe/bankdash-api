const express = require('express')

const router = express.Router();

const User = require('../controllers/users')
const { userIsSignedIn} = require('../middleware/auth.users');
const { verify_X_API_KEY } = require('../middleware/auth');

//// auth 
router.post('/change/password',  verify_X_API_KEY, userIsSignedIn)

////

router.post('/updateBio', verify_X_API_KEY, userIsSignedIn, User.update_bio_data)

module.exports = router;