const { Model } = require('sequelize')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = require('../config/config')

const adminModel = (sequelize, DataTypes) => {

    class Admin extends Model {

        generateJwtSignedToken() {
            const payload = {
                userId: this.adminId,
                userType: 'admin'
            };
            const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
            return token;
        }
    }

    Admin.init({
        adminId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordToken : {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires : {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, 
    {
        sequelize,
        modelName: 'admin',
        tableName: 'admin',
        timestamps: false,

    });

    return Admin;
}

module.exports = adminModel;