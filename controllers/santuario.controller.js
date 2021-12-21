const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idSant,fotoSant, nomeSant, endeSant, teleSant, emaSant, direcSant, histoSant FROM santuarios order by idSant desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idSant,fotoSant, nomeSant, endeSant, teleSant, emaSant, direcSant, histoSant FROM santuarios where idCong = ? order by idCong desc ', post, function(err, rows, fields) {
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
    constfotoSant = req.sanitize('fotoSem').escape();
    const nomeSant = req.sanitize('nomeSant').escape();
    const endeSant = req.sanitize('endeSant').escape();
    const teleSant = req.sanitize('teleSant').escape();
    const emaSant = req.sanitize('emaSant').escape();
    const direcSant = req.sanitize('direcSant').escape();
    const histoSant = req.sanitize('histoSant').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeSant", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeSant", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleSant", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaSant", "Insira um email correcto").isEmail();
    req.checkBody("direcSant", "Direcção do Santuário").isEmail();
    req.checkBody("histoSant", "História sobre a este Santuário").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoSem != "NULL" && nomeSant != "NULL" && endeSant != "NULL" && teleSant != "NULL" && emaSant != "NULL"&& direcSant != "NULL" && histoSant != "NULL" && typeof(nomeSant) != 'undefined') {
        const post = {fotoSant:fotoSant, nomeSant: nomeSant, endeSant: endeSant, teleSant: teleSant, emaSant: emaSant,direcSant: direcSant, histoSant: histoSant };
        const query = connect.con.query('INSERT INTO santuarios SET ?', post, function(err, rows, fields) {
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
    constfotoSant = req.sanitize('fotoSem').escape();
    const nomeSant = req.sanitize('nomeSant').escape();
    const endeSant = req.sanitize('endeSant').escape();
    const teleSant = req.sanitize('teleSant').escape();
    const emaSant = req.sanitize('emaSant').escape();
    const direcSant = req.sanitize('direcSant').escape();
    const histoSant = req.sanitize('histoSant').escape();
    const idSant = req.sanitize('idSant').escape();
    
    req.checkBody("fotoSem", "Insira uma imagem").optional();
    req.checkBody("nomeSant", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeSant", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleSant", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaSant", "Insira um email correcto").isEmail();
    req.checkBody("direcSant", "Direcção do Santuário").noEmpty();
    req.checkBody("histoSant", "História sobre a este Santuário").optional();
    req.checkParams("idSant", "Insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idSant != "NULL" && typeof(fotoSem) != 'undefined' && typeof(nomeSant) != 'undefined' && typeof(endeSant) != 'undefined' && typeof(teleSant) != 'undefined' && typeof(emaSant) != 'undefined' && typeof(direcSant) != 'undefined' && typeof(histoSant) != 'undefined') {
            const update = [fotoSem, nomeSant, endeSant, teleSant, emaSant, direcSant, histoSant, idSant];
            const query = connect.con.query('UPDATE santuarios SETfotoSant =?, nomeSant =?, endeSant =?, teleSant =?, emaSant =?, direcSant =?, histoSant =? WHERE idSantc =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE santuarios SET active = ? WHERE idSantc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM santuarios WHERE idSantc=?', update, function(err, rows, fields) {
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