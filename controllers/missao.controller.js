const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idMiss, fotoMiss, nomeMiss, endeMiss, teleMiss, emaMiss, sacMiss, histMiss FROM missoes order by idMiss desc', function (err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
};

function readID(req, res) {
    const idArc = req.sanitize('id').escape();
    const post = { idArc: idArc };
    const query = connect.con.query('SELECT idMiss, fotoMiss, nomeMiss, endeMiss, teleMiss, emaMiss, sacMiss, histMiss FROM missoes where idMiss = ? order by idMiss desc ', post, function (err, rows, fields) {
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
    constfotoMiss = req.sanitize('fotoSem').escape();
    const nomeMiss = req.sanitize('nomeMiss').escape();
    const endeMiss = req.sanitize('endeMiss').escape();
    const teleMiss = req.sanitize('teleMiss').escape();
    const emaMiss = req.sanitize('emaMiss').escape();
    const sacMiss = req.sanitize('sacMiss').escape();
    const histMiss = req.sanitize('histMiss').escape();

    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeMiss", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeMiss", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleMiss", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaMiss", "Insira um email correcto").isEmail();
    req.checkBody("sacMiss", "Direcção do Missão").isEmail();
    req.checkBody("histMiss", "História sobre a este Missão").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

        if (fotoSem != "NULL" && nomeMiss != "NULL" && endeMiss != "NULL" && teleMiss != "NULL" && emaMiss != "NULL" && sacMiss != "NULL" && histMiss != "NULL" && typeof (nomeMiss) != 'undefined') {
            const post = { fotoMiss: fotoMiss, nomeMiss: nomeMiss, endeMiss: endeMiss, teleMiss: teleMiss, emaMiss: emaMiss, sacMiss: sacMiss, histMiss: histMiss };
            const query = connect.con.query('INSERT INTO missoes SET ?', post, function (err, rows, fields) {
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
    constfotoMiss = req.sanitize('fotoSem').escape();
    const nomeMiss = req.sanitize('nomeMiss').escape();
    const endeMiss = req.sanitize('endeMiss').escape();
    const teleMiss = req.sanitize('teleMiss').escape();
    const emaMiss = req.sanitize('emaMiss').escape();
    const sacMiss = req.sanitize('sacMiss').escape();
    const histMiss = req.sanitize('histMiss').escape();
    const idMiss = req.sanitize('idMiss').escape();

    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeMiss", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeMiss", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleMiss", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaMiss", "Insira um email correcto").isEmail();
    req.checkBody("sacMiss", "Direcção do Missão").noEmpty();
    req.checkBody("histMiss", "História sobre a este Missão").optional();
    req.checkParams("idMiss", "Insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idMiss != "NULL" && typeof (fotoSem) != 'undefined' && typeof (nomeMiss) != 'undefined' && typeof (endeMiss) != 'undefined' && typeof (teleMiss) != 'undefined' && typeof (emaMiss) != 'undefined' && typeof (sacMiss) != 'undefined' && typeof (histMiss) != 'undefined') {
            const update = [fotoSem, nomeMiss, endeMiss, teleMiss, emaMiss, sacMiss, histMiss, idMiss];
            const query = connect.con.query('UPDATE missoes SETfotoMiss =?, nomeMiss =?, endeMiss =?, teleMiss =?, emaMiss =?, sacMiss =?, histMiss =? WHERE idMiss =?', update, function (err, rows, fields) {
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
    const query = connect.con.query('UPDATE missoes SET active = ? WHERE idMiss=?', update, function (err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM missoes WHERE idMiss =?', update, function (err, rows, fields) {
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