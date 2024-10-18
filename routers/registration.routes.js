const express = require('express');
const { 
     getCountries, 
     getCountry, 
     getStates,
     getState,
     getlgas,
     getlga,
     bio_data,
     contact_data,
     nextkin_data,
     info
    } = require('../controllers/register');
const { verify_X_API_KEY } = require('../middleware/auth');
const { userIsSignedIn } = require('../middleware/auth.users');

const router = express.Router();

router.post('/step1', verify_X_API_KEY, info);

router.post('/step2', verify_X_API_KEY, bio_data);

router.post('/updateBio', verify_X_API_KEY, userIsSignedIn)

router.post('/contact-data', verify_X_API_KEY,  contact_data);

router.post('/nextkin-data', verify_X_API_KEY,  nextkin_data);

router.get('/countries', verify_X_API_KEY, getCountries)
router.get('/country/:countryId', verify_X_API_KEY, getCountry)
router.get('/states/:countryId', verify_X_API_KEY, getStates)
router.get('/state/:countryId/:stateId', verify_X_API_KEY, getState)
router.get('/lgas/:stateId', verify_X_API_KEY, getlgas)
router.get('/lga/:stateId/:lgaId', verify_X_API_KEY, getlga)


module.exports = router;