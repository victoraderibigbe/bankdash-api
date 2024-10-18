const express = require('express')

const router = express.Router();

const { userLogin } = require('../controllers/auth');
const { verify_X_API_KEY } = require('../middleware/auth');

router.post('/login', verify_X_API_KEY, userLogin)
router.post('/forget/password', verify_X_API_KEY, )
router.post('/reset/password/:token', verify_X_API_KEY, )

module.exports = router;