const db = require('../model');
const { AppError } = require('../utils/error');
const Worker = db.Workers;
const bcrypt = require('bcrypt')
const Admin = db.Admin
const { validatePassword } = require('./../validator/password_validator')
const crypto = require('crypto');

// const { sendMail } = require('');


class AdminAuthService {

    async updatePassword(payload, user) {

        if (Object.keys(payload).length === 0) {

            throw new AppError('Bad data,', 400);

        }
        if (!payload.oldPassword || !payload.newPassword) {
            throw new AppError('can not be empty', 400);
        }
        try {
            const worker = await Worker.findOne({
                where: { workerId : user.id },
        });
        if (!worker) {
            throw new AppError('logged in?', 404);
        }

        const isMatch = await bcrypt.compare(
            payload.oldPassword,
            worker.password
        );

        if (!isMatch) {
            throw new AppError('Former password is wrong!', 400);
        }

        const errorArray = validatePassword(payload.newPassword);

        if (errorArray[0]) {
            throw new AppError(errorArray[0], 400);
        }

        const salt = await bcrypt.genSalt(10);

        const newPassword = await bcrypt.hash(payload.newPassword, salt);

        const updatedRows = await Worker.update(
            { password: newPassword },

            { where: { workerId : user.id } }
        );

        if (updatedRows[0] === 0) {
            throw new AppError('Password update failed!', 500);
        }

        return true;
    } catch (error) {
        throw error;
    }
}

    async generatePasswordReset(data){
        const resetToken  = crypto.randomBytes(32).toString('hex')
        try {
            const {  email } = data;
            if (!email) {
                throw new AppError('Please provide email and user type', 400);
            }else{
                const worker = await Worker.findOne({
                where : { email: email}
            });
            if (!worker) {
                throw new AppError("invalid detail", 404);
            }else{
                resetPasswordExpiredTime = Date.now() + 360000
                await Worker.update(
                    { resetPasswordToken : resetToken, resetPasswordExpires : resetPasswordExpiredTime },
                    { where : { email: email } }
                )
                return true;
            }
            }
        } catch (error) {
            throw error;
        }
    }



}

module.exports = new AdminAuthService();