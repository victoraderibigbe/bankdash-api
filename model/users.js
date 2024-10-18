
const { Model } = require('sequelize');

const UserModel = (sequelize, DataTypes) => {

    class User extends Model { }

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
        },
        password :{
            type : DataTypes.STRING(100),
            allowNull : false
        },
        firstname: {
            type: DataTypes.STRING(100),
        },
        middlename: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING(100),
        },
        otp : {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        timeOptExpired : {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        active : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        DeactivateAccount : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        resetPasswordToken : {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires : {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },

    },

        {
            sequelize,
            modelName: 'user',
            tableName: 'user',
            timestamps: true
        });

    return User;
}

module.exports = UserModel;
