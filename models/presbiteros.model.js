module.exports = function (sequelize, Sequelize) {
    let Presbiteros = sequelize.define('presbiteros', {
        idPresb: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        fotoPresb: { type: Sequelize.BLOB, notEmpty: true },
        nomePresb: { type: Sequelize.STRING, notEmpty: true },
        bioPresb: { type: Sequelize.TEXT },
        status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
    });
    return Presbiteros;
}

