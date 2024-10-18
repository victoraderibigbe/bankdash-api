const { Model } = require('sequelize');

const contactModel = (sequelize, DataTypes) => {
    class  Contact extends Model { }

    Contact.init(
        {
            contactId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nationality: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            countryOfResidence: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            stateProvince: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            house_address: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            po_box: {
                type: DataTypes.STRING(50),
                allowNull: true
            },

            Contact_UserId: {
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
            modelName: 'contact',
            tableName: 'contact',
            timestamps: true
        }
    );


    return Contact;
};

module.exports = contactModel;