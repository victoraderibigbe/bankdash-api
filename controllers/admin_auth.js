const { Users } = require('../model');
const Auth = require('../services/admin.auth.service');
const { errorHandler, AppError } = require('../utils/error');


exports.change_password = async (req, res) => {
	try {
		const response = await Auth.updatePassword(req.body, req.user);
		if (response) {
			res.status(200).json({
				code: 200,
				message: 'Password changed successfully!',
			});
		}
	} catch (error) {
		return errorHandler(error, res);
	}
};


exports.forgetPassword = async (req, res)=>{
	try {
		const response = await Auth.generatePasswordReset(req.body);
		if (response) {
			res.status(200).json({
				code: 200,
				message: '',
			});
		}
	} catch (error) {
		return errorHandler(error, res);
	}
}