const { Model } = require('sequelize');

const profileModel = (sequelize, DataTypes) => {
    class  Profile extends Model { }

    Profile.init(
        {
            profileId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            profileImage: {
                type: DataTypes.STRING,
                allowNull: true
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
            modelName: 'profile',
            tableName: 'profile',
            timestamps: true
        }
    );


    return Profile;
};

module.exports = profileModel;