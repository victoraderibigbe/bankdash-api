const Auth = require('../services/auth.services')
const { errorHandler } = require('../utils/error')


exports.login = async (req, res) => {
    try {
        const { user, token } = await Auth.loginAdmin(req.body)
        console.log(user)
        res.status(200).json({ user, token })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.userLogin = async (req, res)=>{
    try {
        const { user, token } = await Auth.Users(req.body)
        res.status(200).json({user, token })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.AdminType = async ( req,res ) =>{
    try {
        const userType = await Auth.userType(req.body)
        res.status(200).json({ userType })
    } catch (error) {
        errorHandler(error, res)
    }
}