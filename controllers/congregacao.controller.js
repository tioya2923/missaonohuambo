const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idCongr, fotoCongr, nomeCongr, endeCongr, teleCongr, emaCongr, congrDirec, histoCongr FROM congregacoes order by idCongr desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idCongr, fotoCongr, nomeCongr, endeCongr, teleCongr, emaCongr, congrDirec, histoCongr FROM congregacoes where idCong = ? order by idCong desc ', post, function(err, rows, fields) {
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
    const fotoCongr = req.sanitize('fotoCongr').escape();
    const nomeCongr = req.sanitize('nomeCongr').escape();
    const endeCongr = req.sanitize('endeCongr').escape();
    const teleCongr = req.sanitize('teleCongr').escape();
    const emaCongr = req.sanitize('emaCongr').escape();
    const congrDirec = req.sanitize('congrDirec').escape();
    const histoCongr = req.sanitize('histoCongr').escape();
    
    req.checkBody("fotoCongr", "Insira uma imagem").optional();
    req.checkBody("nomeCongr", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeCongr", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleCongr", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaCongr", "Insira um email correcto").isEmail();
    req.checkBody("congrDirec", "Direcção da Congregação").isEmail();
    req.checkBody("histoCongr", "História sobre a esta Congregação").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoCongr != "NULL" && nomeCongr != "NULL" && endeCongr != "NULL" && teleCongr != "NULL" && emaCongr != "NULL"&& congrDirec != "NULL" && histoCongr != "NULL" && typeof(nomeCongr) != 'undefined') {
        const post = { fotoCongr: fotoCongr, nomeCongr: nomeCongr, endeCongr: endeCongr, teleCongr: teleCongr, emaCongr: emaCongr,congrDirec: congrDirec, histoCongr: histoCongr };
        const query = connect.con.query('INSERT INTO congregacoes SET ?', post, function(err, rows, fields) {
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
    const fotoCongr = req.sanitize('fotoCongr').escape();
    const nomeCongr = req.sanitize('nomeCongr').escape();
    const endeCongr = req.sanitize('endeCongr').escape();
    const teleCongr = req.sanitize('teleCongr').escape();
    const emaCongr = req.sanitize('emaCongr').escape();
    const congrDirec = req.sanitize('congrDirec').escape();
    const histoCongr = req.sanitize('histoCongr').escape();
    const idCongr = req.sanitize('idCongr').escape();
    
    req.checkBody("fotoCongr", "Insira uma imagem").optional();
    req.checkBody("nomeCongr", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeCongr", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleCongr", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaCongr", "Insira um email correcto").isEmail();
    req.checkBody("congrDirec", "Direcção da Congregação").noEmpty();
    req.checkBody("histoCongr", "História sobre a esta Congregação").optional();
    req.checkParams("idCongr", "Insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idCongr != "NULL" && typeof(fotoCongr) != 'undefined' && typeof(nomeCongr) != 'undefined' && typeof(endeCongr) != 'undefined' && typeof(teleCongr) != 'undefined' && typeof(emaCongr) != 'undefined' && typeof(congrDirec) != 'undefined' && typeof(histoCongr) != 'undefined') {
            const update = [fotoCongr, nomeCongr, endeCongr, teleCongr, emaCongr, congrDirec, histoCongr, idCongr];
            const query = connect.con.query('UPDATE congregacoes SET fotoCongr =?, nomeCongr =?, endeCongr =?, teleCongr =?, emaCongr =?, congrDirec =?, histoCongr =? WHERE idCongrc =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE congregacoes SET active = ? WHERE idCongrc=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM congregacoes WHERE idCongrc=?', update, function(err, rows, fields) {
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