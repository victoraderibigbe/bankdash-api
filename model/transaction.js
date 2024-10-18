const { Model } = require('sequelize');

const transactionModel = (sequelize, DataTypes) => {

    class Transaction extends Model { }

    Transaction.init({
        _Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        Transaction_Id :{
            type: DataTypes.INTEGER(255),
            allowNull: false,

        },

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'userId',
            },
        },

        Account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'account',
                key: 'accountId',
            },
        },
        
        Transaction_Type: {
            type: DataTypes.ENUM('withdrawal', 'transfer'),
            allowNull: false
        },


        Transaction_amount : {
            type: DataTypes.INTEGER(50),
            allowNull: false,
        },


        Transaction_message : {
            type :  DataTypes.STRING(50),
            allowNull : true
        }

        

    },

        {
            sequelize,
            modelName: 'transaction',
            tableName: 'transaction',
            timestamps: true
        });

    return Transaction;

}

module.exports = transactionModel;