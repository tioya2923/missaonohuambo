module.exports = function (sequelize, Sequelize) {
    let Bispos = sequelize.define('bispos', {
        idBispo: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        fotoBispo: { type: Sequelize.BLOB, notEmpty: false },
        nomeBispo: { type: Sequelize.STRING, notEmpty: true },
        bioBispo: { type: Sequelize.TEXT },
        status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
    });
    return Bispos;
}

