const { Model } = require('sequelize');

const NextOfKinModel = (sequelize, DataTypes) => {

    class NextOfKin extends Model { }

    NextOfKin.init({
        _Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lgaName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        user_Id: {
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
            modelName: 'nextOfKin',
            tableName: 'nextOfKin',
            timestamps: false
        });

    
    return NextOfKin;
}

module.exports = NextOfKinModel;