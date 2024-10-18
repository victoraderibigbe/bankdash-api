const { Model } = require('sequelize');

const stateModel = (sequelize, DataTypes) => {

    class State extends Model { }

    State.init({
        stateId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        stateName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'country',
                key: 'countryId',
            },
        }

    },

        {
            sequelize,
            modelName: 'state',
            tableName: 'state',
            timestamps: false
        });

    State.associate = (models) => {

        State.belongsTo(models.Country, {
            foreignKey: 'countryId',
            as: 'country',
        });

    };





    return State;
}

module.exports = stateModel;