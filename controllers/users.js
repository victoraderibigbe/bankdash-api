const User = require('../services/users.service')

const { errorHandler } = require('../utils/error')

exports.getUserData = async (req, res) => {
    try {
        const { Id } = req.params;
        const member = await User.getUserData(Id);
        return res.status(200).json({ user : member });
    } catch (error) {
        errorHandler(error, res);
    }
}

exports.getUsersData = async (req, res) =>{
    try {
        const members = await User.getUsersData()
        return res.status(200).json({ users : members });
    } catch (error) {
        errorHandler(error, res);
    }
} 

exports.update_bio_data = async(req, res) => {
    try {
        const data = req.body;
        const response = await User.update_bio_data(data, req.user);
        res.status(200).json({response});   
    } catch (error) {
        errorHandler(error,res)
    }
}
