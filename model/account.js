const { Model } = require('sequelize');

const accountModel = (sequelize, DataTypes) => {

    class Account extends Model { }

    Account.init({
        accountId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        AccountNumber: {
            type: DataTypes.INTEGER(60),
            allowNull: false,
            unique : true,
        },

        account_type :{
            type: DataTypes.ENUM("Savings", "Current", "Fixed Deposit"),
            defaultValue : "Savings",
            allowNull: false
        },

        account_pin : {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue : 3452
        },
         
        AccountBalance: {
            type: DataTypes.FLOAT(50),
            allowNull: false,
        },

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'userId',
            },
        }

    },

        {
            sequelize,
            modelName: 'account',
            tableName: 'account',
            timestamps: false
        });

    return Account;
}

module.exports = accountModel;