const { Model } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const workerModel = (sequelize, DataTypes) => {

    class workers extends Model {

        generateJwtSignedToken() {
            const payload = {
                userId: this.workerId,
                userType: 'worker',
                workerType: this.workerType
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME });

            return token;
        }

    }

    workers.init({

        workerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        workerMail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        workersType: {
            type: DataTypes.ENUM('hr', 'intern_hr', 'customers_care', 'intern_customers_care', 'backend_developer', 'intern_backend_developer', 'database_admin', 'intern_database_admin', 'fontend_developer', 'intern_fontend_developer', 'cyber_security', 'intern_cyber_security'),
            allowNull: false
        },
        
        workerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resetPasswordToken : {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires : {
            type: DataTypes.STRING,
            allowNull: true
        },
        workerArea: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImage : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Local_Govt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DeactivateAccount : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }


    }, {
        sequelize,
        modelName: 'workers',
        tableName: 'workers',
        timestamps: false,
        hooks: {
            beforeCreate: async (worker) => {
                const salt = await bcrypt.genSalt(10);
                worker.password = await bcrypt.hash(worker.password, salt);
            },
            beforeUpdate: async (worker) => {
                if (worker.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    worker.password = await bcrypt.hash(worker.password, salt);
                }
            },
        },
    });


    return workers
}

module.exports = workerModel;