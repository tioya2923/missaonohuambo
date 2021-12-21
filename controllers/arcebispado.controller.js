const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idArc, fotoArc, nomeArc, endeArc, teleArc, emaArc, histArc FROM arcebispado order by idArc desc', function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status) .send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.dbError.status) .send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
};

function readID(req, res) {
    const idArc = req.sanitize('id') .escape();
    const post = {idArc: idArc};
    const query = connect.con.query('SELECT idArc, fotoArc, nomeArc, endeArc, teleArc, emaArc, histArc FROM arcebispado where idArc = ? order by idArc desc ', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
};


function save(req, res) {
    const fotoArc = req.sanitize('fotoArc').escape();
    const nomeArc = req.sanitize('nomeArc').escape();
    const endeArc = req.sanitize('endeArc').escape();
    const teleArc = req.sanitize('teleArc').escape();
    const emaArc = req.sanitize('emaArc').escape();
    const histArc = req.sanitize('histArc').escape();
    
    req.checkBody("fotoArc", "Insira uma imagem").optional();
    req.checkBody("nomeArc", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeArc", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleArc", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaArc", "Insira um email correcto").isEmail();
    req.checkBody("histArc", "História sobre o Arcebispado").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoArc != "NULL" && nomeArc != "NULL" && endeArc != "NULL" && teleArc != "NULL" && emaArc != "NULL" && histArc != "NULL" && typeof(nomeArc) != 'undefined') {
        const post = { fotoArc: fotoArc, nomeArc: nomeArc, endeArc: endeArc, teleArc: teleArc, emaArc: emaArc, histArc: histArc };
        const query = connect.con.query('INSERT INTO arcebispado SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
            }
            else {
                console.log(err);
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
            }            
        });
    }
    else 
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }

}

function update(req, res) {
    const fotoArc = req.sanitize('fotoArc').escape();
    const nomeArc = req.sanitize('nomeArc').escape();
    const endeArc = req.sanitize('endeArc').escape();
    const teleArc = req.sanitize('teleArc').escape();
    const emaArc = req.sanitize('emaArc').escape();
    const histArc = req.sanitize('histArc').escape();
    const idArc = req.sanitize('idArc').escape(); 

    req.checkBody("fotoArc", "Insira uma imagem").optional();
    req.checkBody("nomeArc", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeArc", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleArc", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaArc", "Insira um email correcto").isEmail();
    req.checkBody("histArc", "História sobre o Arcebispado").optional();
    req.checkParams ("idArc", "Insira o ID do Arcebispado válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idArc != "NULL" && typeof(fotoArc) != 'undefined' && typeof(nomeArc) != 'undefined' && typeof(endeArc) != 'undefined' && typeof(teleArc) != 'undefined' && typeof(emaArc) != 'undefined' && typeof(histArc) != 'undefined') {
            const update = [fotoArc, nomeArc, endeArc, teleArc, emaArc, histArc, idArc];
            const query = connect.con.query('UPDATE arcebispado SET fotoArc =?, nomeArc =?, endeArc =?, teleArc =?, emaArc =?, histArc =? WHERE idArc =?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.dbError);
                }
            });
        }
        else
        res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

function deleteL(req, res) {
    const update = [0, req.sanitize().escape()];
    const query = connect.con.query('UPDATE arcebispado SET active = ? WHERE idArc=?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.dbError);
        }
    });
}

function deleteF(req, res) {
    const update = req.sanitize('id').escape();
    const query = connect.con.query('DELETE FROM arcebispado WHERE idArc=?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.dbError);
        }
    });
}

module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteL: deleteL,
    deleteF: deleteF,
}