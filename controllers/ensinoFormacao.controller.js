const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idEnsinoFormacao, fotoEnsinoFormacao, nomeEnsinoFormacao, endeEnsinoFormacao, teleEnsinoFormacao, emaEnsinoFormacao, direcEnsinoFormacao, histoEnsinoFormacao FROM ensinoFormacao order by idEnsinoFormacao desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idEnsinoFormacao, fotoEnsinoFormacao, nomeEnsinoFormacao, endeEnsinoFormacao, teleEnsinoFormacao, emaEnsinoFormacao, direcEnsinoFormacao, histoEnsinoFormacao FROM ensinoFormacao where idEnsinoFormacao = ? order by idEnsinoFormacao desc ', post, function(err, rows, fields) {
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
    const fotoEnsinoFormacao = req.sanitize('fotoEnsinoFormacao').escape();
    const nomeEnsinoFormacao = req.sanitize('nomeEnsinoFormacao').escape();
    const endeEnsinoFormacao = req.sanitize('endeEnsinoFormacao').escape();
    const teleEnsinoFormacao = req.sanitize('teleEnsinoFormacao').escape();
    const emaEnsinoFormacao = req.sanitize('emaEnsinoFormacao').escape();
    const direcEnsinoFormacao = req.sanitize('direcEnsinoFormacao').escape();
    const histoEnsinoFormacao = req.sanitize(' histoEnsinoFormacao').escape();
    
    
    req.checkBody("fotoEnsinoFormacao", "Insira uma imagem").optional();
    req.checkBody("nomeEnsinoFormacao", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeEnsinoFormacao", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleEnsinoFormacao", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaEnsinoFormacao", "Insira um email correcto").isEmail();
    req.checkBody("direcEnsinoFormacao", "Direcção").noEmpty();
    req.checkBody("hhistoEnsinoFormacao", "História sobre").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoEnsinoFormacao != "NULL" && nomeEnsinoFormacao != "NULL" && endeEnsinoFormacao != "NULL" && teleEnsinoFormacao != "NULL" && emaEnsinoFormacao != "NULL" && direcEnsinoFormacao != "NULL" && histoEnsinoFormacao != "NULL" && typeof(nomeEnsinoFormacao) != 'undefined') {
        const post = {fotoEnsinoFormacao:fotoEnsinoFormacao,nomeEnsinoFormacao:nomeEnsinoFormacao, endeEnsinoFormacao: endeEnsinoFormacao, teleEnsinoFormacao: teleEnsinoFormacao, emaEnsinoFormacao: emaEnsinoFormacao, direcEnsinoFormacao: direcEnsinoFormacao, histoEnsinoFormacao: histoEnsinoFormacao };
        const query = connect.con.query('INSERT INTO ensinoFormacao SET ?', post, function(err, rows, fields) {
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
    const fotoEnsinoFormacao = req.sanitize('fotoEnsinoFormacao').escape();
    const nomeEnsinoFormacao = req.sanitize('nomeEnsinoFormacao').escape();
    const endeEnsinoFormacao = req.sanitize('endeEnsinoFormacao').escape();
    const teleEnsinoFormacao = req.sanitize('teleEnsinoFormacao').escape();
    const emaEnsinoFormacao = req.sanitize('emaEnsinoFormacao').escape();
    const direcEnsinoFormacao = req.sanitize('direcEnsinoFormacao').escape();
    const histoEnsinoFormacao = req.sanitize('histoEnsinoFormacao').escape();
    const idEnsinoFormacao = req.sanitize('idEnsinoFormacao').escape();   
    
    req.checkBody("fotoEnsinoFormacao", "Insira uma imagem").optional();
    req.checkBody("nomeEnsinoFormacao", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeEnsinoFormacao", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleEnsinoFormacao", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaEnsinoFormacao", "Insira um email correcto").isEmail();
    req.checkBody("direcEnsinoFormacao", "Direcção").noEmpty();
    req.checkBody("histoEnsinoFormacao", "História sobre").optional();
    req.checkParams("idEnsinoFormacao", "insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idEnsinoFormacao != "NULL" && typeof(fotoEnsinoFormacao) != 'undefined' && typeof(nomeEnsinoFormacao) != 'undefined' && typeof(endeEnsinoFormacao) != 'undefined' && typeof(teleEnsinoFormacao) != 'undefined' && typeof(emaEnsinoFormacao) != 'undefined' && typeof(direcEnsinoFormacao) != 'undefined' && typeof(histoEnsinoFormacao) != 'undefined') {
            const update = [fotoEnsinoFormacao, nomeEnsinoFormacao, endeEnsinoFormacao, teleEnsinoFormacao, emaEnsinoFormacao, direcEnsinoFormacao, histoEnsinoFormacao, idEnsinoFormacao];
            const query = connect.con.query('UPDATE ensinoFormacao SETfotoEnsinoFormacao =?, nomeEnsinoFormacao =?, endeEnsinoFormacao =?, teleEnsinoFormacao =?, emaEnsinoFormacao =?, direcEnsinoFormacao =? histoEnsinoFormacao =? WHERE idEnsinoFormacao =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE ensinoFormacao SET active = ? WHERE idEnsinoFormacao=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM ensinoFormacao WHERE idEnsinoFormacao=?', update, function(err, rows, fields) {
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