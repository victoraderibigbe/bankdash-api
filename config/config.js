module.exports = {
    HOST: process.env.HOST,
    USER: String(process.env.SQL_USER),
    PASSWORD: process.env.MY_SQL_PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DIALECT,
    pool: {
        max: Number(process.env.POOL_MAX),
        min: Number(process.env.POOL_MIN),
        acquire: Number(process.env.POOL_ACQUIRE),
        idle: Number(process.env.POOL_IDLE)
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ADMIN_JWT_SECRET_KEY : process.env.ADMIN_JWT_SECRET_KEY,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    SMTP: process.env.SMTP,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    HASH_KEY: process.env.HASH_KEY,
    X_API_KEY : process.env.X_API_KEY,
    PORT : process.env.PORT
};
