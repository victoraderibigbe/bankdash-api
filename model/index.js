const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");

const bcrypt = require('bcrypt');

const createAdmin = async () => {
    await bcrypt.hash(dbConfig.ADMIN_PASSWORD, 10, async (err, hashedPassword) => {
        if (err) throw err;
        try {
            const newAdmin = await db.Admin.create({
                username: dbConfig.ADMIN_USERNAME,
                password: hashedPassword,
            });
            console.log('New admin created successfully!');
        } catch (error) {
            console.error('Error creating new admin:', error);
        }
    });
}
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./users.js")(sequelize, Sequelize);
db.Admin = require("./admin.js")(sequelize, Sequelize);
db.Account = require("./account.js")(sequelize, Sequelize);
db.Workers= require("./administrator.js")(sequelize, Sequelize);
db.Transaction = require("./transaction.js")(sequelize, Sequelize);
db.Contact = require("./contact.js")(sequelize, Sequelize);
db.Profile = require("./profile.js")(sequelize, Sequelize);
db.Country = require("./country.js")(sequelize, Sequelize);
db.State = require("./states.js")(sequelize, Sequelize);
db.lga = require("./lga.js")(sequelize, Sequelize);
db.nextOfKin = require("./next-of-kin-info.js")(sequelize, Sequelize)





Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});



db.sequelize.sync({ force: false })
    .then(async () => {

        console.log('DB Sync Completed!');

        const adminCount = await db.Admin.count();
        if (adminCount < 1) {
            await createAdmin();
            console.log(`Admin Created`)
        }
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


module.exports = db;
