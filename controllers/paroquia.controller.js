const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idParoq, fotoParoq, nomeParoq, endeParoq, teleParoq, emaParoq, sacParoq, histParoq FROM paroquias order by idParoq desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idParoq,fotoParoq, nomeParoq, endeParoq, teleParoq, emaParoq, sacParoq, histParoq FROM paroquias where idParoq = ? order by idParoq desc ', post, function(err, rows, fields) {
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
    constfotoParoq = req.sanitize('fotoSem').escape();
    const nomeParoq = req.sanitize('nomeParoq').escape();
    const endeParoq = req.sanitize('endeParoq').escape();
    const teleParoq = req.sanitize('teleParoq').escape();
    const emaParoq = req.sanitize('emaParoq').escape();
    const sacParoq = req.sanitize('sacParoq').escape();
    const histParoq = req.sanitize('histParoq').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeParoq", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeParoq", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleParoq", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaParoq", "Insira um email correcto").isEmail();
    req.checkBody("sacParoq", "Direcção do Paróquia").isEmail();
    req.checkBody("histParoq", "História sobre a este Paróquia").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoSem != "NULL" && nomeParoq != "NULL" && endeParoq != "NULL" && teleParoq != "NULL" && emaParoq != "NULL"&& sacParoq != "NULL" && histParoq != "NULL" && typeof(nomeParoq) != 'undefined') {
        const post = {fotoParoq:fotoParoq, nomeParoq: nomeParoq, endeParoq: endeParoq, teleParoq: teleParoq, emaParoq: emaParoq,sacParoq: sacParoq, histParoq: histParoq };
        const query = connect.con.query('INSERT INTO paroquias SET ?', post, function(err, rows, fields) {
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
    constfotoParoq = req.sanitize('fotoSem').escape();
    const nomeParoq = req.sanitize('nomeParoq').escape();
    const endeParoq = req.sanitize('endeParoq').escape();
    const teleParoq = req.sanitize('teleParoq').escape();
    const emaParoq = req.sanitize('emaParoq').escape();
    const sacParoq = req.sanitize('sacParoq').escape();
    const histParoq = req.sanitize('histParoq').escape();
    const idParoq = req.sanitize('idParoq').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeParoq", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeParoq", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleParoq", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaParoq", "Insira um email correcto").isEmail();
    req.checkBody("sacParoq", "Direcção do Paróquia").noEmpty();
    req.checkBody("histParoq", "História sobre a este Paróquia").optional();
    req.checkParams("idParoq", "Insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idParoq != "NULL" && typeof(fotoSem) != 'undefined' && typeof(nomeParoq) != 'undefined' && typeof(endeParoq) != 'undefined' && typeof(teleParoq) != 'undefined' && typeof(emaParoq) != 'undefined' && typeof(sacParoq) != 'undefined' && typeof(histParoq) != 'undefined') {
            const update = [fotoSem, nomeParoq, endeParoq, teleParoq, emaParoq, sacParoq, histParoq, idParoq];
            const query = connect.con.query('UPDATE paroquias SETfotoParoq =?, nomeParoq =?, endeParoq =?, teleParoq =?, emaParoq =?, sacParoq =?, histParoq =? WHERE idParoqc =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE paroquias SET active = ? WHERE idParoqc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM paroquias WHERE idParoqc=?', update, function(err, rows, fields) {
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