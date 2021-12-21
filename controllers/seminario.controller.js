const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idSem, fotoSem, nomeSem, endeSem, teleSem, emaSem, semDirec, histoSem FROM seminarios order by idSem desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idSem, fotoSem, nomeSem, endeSem, teleSem, emaSem, semDirec, histoSem FROM seminarios where idCong = ? order by idCong desc ', post, function(err, rows, fields) {
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
    const fotoSem = req.sanitize('fotoSem').escape();
    const nomeSem = req.sanitize('nomeSem').escape();
    const endeSem = req.sanitize('endeSem').escape();
    const teleSem = req.sanitize('teleSem').escape();
    const emaSem = req.sanitize('emaSem').escape();
    const semDirec = req.sanitize('semDirec').escape();
    const histoSem = req.sanitize('histoSem').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeSem", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeSem", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleSem", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaSem", "Insira um email correcto").isEmail();
    req.checkBody("semDirec", "Direcção do Seminário").isEmail();
    req.checkBody("histoSem", "História sobre a este Seminário").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoSem != "NULL" && nomeSem != "NULL" && endeSem != "NULL" && teleSem != "NULL" && emaSem != "NULL"&& semDirec != "NULL" && histoSem != "NULL" && typeof(nomeSem) != 'undefined') {
        const post = { fotoSem: fotoSem, nomeSem: nomeSem, endeSem: endeSem, teleSem: teleSem, emaSem: emaSem,semDirec: semDirec, histoSem: histoSem };
        const query = connect.con.query('INSERT INTO seminarios SET ?', post, function(err, rows, fields) {
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
    const fotoSem = req.sanitize('fotoSem').escape();
    const nomeSem = req.sanitize('nomeSem').escape();
    const endeSem = req.sanitize('endeSem').escape();
    const teleSem = req.sanitize('teleSem').escape();
    const emaSem = req.sanitize('emaSem').escape();
    const semDirec = req.sanitize('semDirec').escape();
    const histoSem = req.sanitize('histoSem').escape();
    const idSem = req.sanitize('idSem').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeSem", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeSem", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleSem", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaSem", "Insira um email correcto").isEmail();
    req.checkBody("semDirec", "Direcção do Seminário").noEmpty();
    req.checkBody("histoSem", "História sobre a este Seminário").optional();
    req.checkParams("idSem", "Insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idSem != "NULL" && typeof(fotoSem) != 'undefined' && typeof(nomeSem) != 'undefined' && typeof(endeSem) != 'undefined' && typeof(teleSem) != 'undefined' && typeof(emaSem) != 'undefined' && typeof(semDirec) != 'undefined' && typeof(histoSem) != 'undefined') {
            const update = [fotoSem, nomeSem, endeSem, teleSem, emaSem, semDirec, histoSem, idSem];
            const query = connect.con.query('UPDATE seminarios SET fotoSem =?, nomeSem =?, endeSem =?, teleSem =?, emaSem =?, semDirec =?, histoSem =? WHERE idSemc =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE seminarios SET active = ? WHERE idSemc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM seminarios WHERE idSemc=?', update, function(err, rows, fields) {
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