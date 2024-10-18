const { Model } = require('sequelize');

const LGAModel = (sequelize, DataTypes) => {

    class locatGovt extends Model { }

    locatGovt.init({
        lgaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lgaName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'state',
                key: 'stateId',
            },
        }

    },

        {
            sequelize,
            modelName: 'lga',
            tableName: 'lga',
            timestamps: false
        });

        locatGovt.associate = (models) => {

            locatGovt.belongsTo(models.State, {
            foreignKey: 'stateId',
            as: 'state',
        });


    };
    
    return locatGovt;
}

module.exports = LGAModel;