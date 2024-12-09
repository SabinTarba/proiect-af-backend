const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'app/database/sqlite/db.sqlite',
    logging: false
})

sequelize
    .sync()
    .then(() => {
        console.log('Models sucessfully (re)created!');
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = { sequelize }