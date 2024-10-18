const { Model } = require('sequelize');

const countryModel = (sequelize, DataTypes) => {

    class Country extends Model { }

    Country.init({
        countryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        countryName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        countryCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }

    },

        {
            sequelize,
            modelName: 'country',
            tableName: 'country',
            timestamps: false
        });

    Country.associate = (models) => {

        Country.hasMany(models.State, {
            foreignKey: 'countryId',
            as: 'states',
        });

    };

    return Country;
}

module.exports = countryModel;