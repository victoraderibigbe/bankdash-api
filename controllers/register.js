const RegistrationService = require('../services/registration.service');

const { errorHandler } = require('../utils/error')

const Registration = new RegistrationService();

exports.info = async(req, res)=>{
    try {
        const data = req.body;
        const response = await Registration.info(data);
        res.status(200).json({response});        
    } catch (error) {
        errorHandler(error,res)
    }
}

exports.bio_data = async(req, res) => {
    try {
        const data = req.body;
        const response = await Registration.bio_data(data);
        res.status(200).json({response});   
    } catch (error) {
        errorHandler(error,res)
    }
}

exports.contact_data = async (req, res)=>{
    try {
        const data = req.body;
        const response = await Registration.contact_data(data);
        res.status(200).json({response});
    } catch (error) {
        errorHandler(error,res)
    }
}

exports.nextkin_data = async (req, res)=>{
    try {
        const data = req.body;
        const response = await Registration.nextkin_data(data);
        res.status(200).send(response);
    } catch (error) {
        errorHandler(error,res)
    }
}

exports.getCountries = async (req, res) =>{
    try {
        const countries = await Registration.countries()
        res.status(200).json({countries})
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getCountry = async (req, res) =>{
    try {
        const country = await Registration.country(req.params.countryId)
        res.status(200).json({country})
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getStates = async (req, res) =>{
    try {
        const States = await Registration.states(req.params.countryId)
        res.status(200).json({States})
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getState = async (req, res) =>{
    try {
        const State = await Registration.state(req.params.countryId, req.params.stateId)
        res.status(200).json({State})
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getlgas = async (req, res) =>{
    try {
        const lgas = await Registration.lgas(req.params.stateId)
        res.status(200).json({lgas})
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getlga = async (req, res) =>{
    try {
        const lga = await Registration.lga(req.params.stateId, req.params.lgaId)
        res.status(200).json({lga})
    } catch (error) {
        errorHandler(error, res)
    }
}