const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idAssoc, fotoAssoc, nomeAssoc, endAssoc, teleAssoc, emaAssoc, assocDirec, histAssoc FROM associacoes order by idAssoc desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idAssoc, fotoAssoc, nomeAssoc, endAssoc, teleAssoc, emaAssoc, assocDirec, histAssoc FROM associacoes where idAssoc = ? order by idAssoc desc ', post, function(err, rows, fields) {
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
    const fotoAssoc = req.sanitize('fotoAssoc').escape();
    const nomeAssoc = req.sanitize('nomeAssoc').escape();
    const endAssoc = req.sanitize('endAssoc').escape();
    const teleAssoc = req.sanitize('teleAssoc').escape();
    const emaAssoc = req.sanitize('emaAssoc').escape();
    const assocDirec = req.sanitize('assocDirec').escape();
    const histAssoc = req.sanitize('histAssoc').escape();
    
    req.checkBody("fotoAssoc", "Insira uma imagem").optional();
    req.checkBody("nomeAssoc", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endAssoc", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleAssoc", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaAssoc", "Insira um email correcto").isEmail();
    req.checkBody("assocDirec", "Direcção da Associação").noEmpty();
    req.checkBody("histAssoc", "História sobre a Associação").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoAssoc != "NULL" && nomeAssoc != "NULL" && endAssoc != "NULL" && teleAssoc != "NULL" && emaAssoc != "NULL" && assocDirec != "NULL" && histAssoc != "NULL" && typeof(nomeAssoc) != 'undefined') {
        const post = { fotoAssoc: fotoAssoc, nomeAssoc: nomeAssoc, endAssoc:endAssoc, teleAssoc: teleAssoc, emaAssoc: emaAssoc, assocDirec: assocDirec, histAssoc: histAssoc };
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
    const fotoAssoc = req.sanitize('fotoAssoc').escape();
    const nomeAssoc = req.sanitize('nomeAssoc').escape();
    const endAssoc = req.sanitize('endAssoc').escape();
    const teleAssoc = req.sanitize('teleAssoc').escape();
    const emaAssoc = req.sanitize('emaAssoc').escape();
    const assocDirec = req.sanitize('assocDirec').escape();
    const histAssoc = req.sanitize('histAssoc').escape();
    const idAssoc = req.sanitize('(idAssoc').escape();
    
    req.checkBody("fotoAssoc", "Insira uma imagem").optional();
    req.checkBody("nomeAssoc", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endAssoc", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleAssoc", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaAssoc", "Insira um email correcto").isEmail();
    req.checkBody("assocDirec", "Direcção da Associação").noEmpty();
    req.checkBody("histAssoc", "História sobre a Associação").optional();
    req.checkParams("(idAssoc", "Insira o ID da Associação válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idAssoc != "NULL" && typeof(fotoAssoc) != 'undefined' && typeof(nomeAssoc) != 'undefined' && typeof(endAssoc) != 'undefined' && typeof(teleAssoc) != 'undefined' && typeof(emaAssoc) != 'undefined' && typeof(assocDirec) != 'undefined' && typeof(histAssoc) != 'undefined') {
            const update = [fotoAssoc, nomeAssoc, endAssoc, teleAssoc, emaAssoc, assocDirec, histAssoc,  idAssoc];
            const query = connect.con.query('UPDATE associacao SET fotoAssoc =?, nomeAssoc =?, endAssoc =?, eleAssoc =?, emaAssoc =?, assocDirec =?,  histAssoc =? WHERE idAssocc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE associacao SET active = ? WHERE idAssoc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM associacao WHERE idArc=?', update, function(err, rows, fields) {
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