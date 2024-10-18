const Admin = require('../services/admin.services')
const { errorHandler } = require('../utils/error')


exports.createworker = async (req, res) => {
    try {
        const workerData = await Admin.createworker(req.body)
        res.status(201).json({ workerData })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.updateBio = async (req, res)=>{
    try {
        const { user, password }  = await Admin.updateBio(req.body.user)
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getworkerById = async (req, res) =>{
    try {
        const worker = await  Admin.getworkerById(req.params.workerId)
        res.status(200).json({ worker })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getAllworkers = async (req, res) =>{
    try {
        const workers = await  Admin.getAllworkers()
        res.status(200).json({ workers })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.updateworkerById = async (req, res) =>{
    try {
        const worker = await  Admin.updateworkerById(req.params.workerId,req.body,req.file)
        res.status(200).json({ worker })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.DeactivateworkerById= async (req, res) =>{
    try {
        const worker = await  Admin.DeactivateworkerById(req.params.workerId)
        res.status(200).json({ worker })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getworkerByfilter = async (req, res)=>{
    try {
        const worker = await Admin.getworkerByfilter(req.query.workerType)
        res.status(200).json({ worker })
    } catch (error) {
        errorHandler(error, res)
    }
}


exports.checkUsername = async (req, res) =>{
    try {
    //     const response = await App.checkUsername(req.query, req.user);
    // res.status(200).json({
    //     code: 200,
    //     status: response,
    //     message: 'Credential status checked successfully!',
    // });
    } catch (error) {
       return errorHandler(error, res);
    }
}