module.exports = function (sequelize, Sequelize) {
    let Paroquias = sequelize.define('paroquias', {
        idParoq: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        fotoParoq: { type: Sequelize.BLOB, notEmpty: true },
        nomeParoq: { type: Sequelize.STRING, notEmpty: true },
        endeParoq: { type: Sequelize.STRING, notEmpty: true },
        teleParoq: { type: Sequelize.INTEGER, notEmpty: true },
        emaParoq: { type: Sequelize.INTEGER, validate: { isEmail: true } },
        sacParoq: { type: Sequelize.STRING, notEmpty: true },
        histParoq: { type: Sequelize.TEXT },
        status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
    });
    return Paroquias;
}

