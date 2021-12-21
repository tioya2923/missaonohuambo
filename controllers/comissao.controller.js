const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idComis, nomeComis, teleComis, emaComis, comisMembr FROM comissoes order by idComis desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idComis, nomeComis, teleComis, emaComis, comisMembr FROM comissoes where idComis = ? order by idComis desc ', post, function(err, rows, fields) {
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
    const nomeComis = req.sanitize('nomeComis').escape();    
    const teleComis = req.sanitize('teleComis').escape();
    const emaComis = req.sanitize('emaComis').escape();
    const comisMembr = req.sanitize('comisMembr').escape();
   
        
    req.checkBody("nomeComis", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("teleComis", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaComis", "Insira um email correcto").isEmail();
    req.checkBody("comisMembr", "Membros").noEmpty(); 
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (nomeComis != "NULL" && teleComis != "NULL" && emaComis != "NULL" && comisMembr != "NULL" && typeof(nomeComis) != 'undefined') {
        const post = { nomeComis: nomeComis, teleComis: teleComis, emaComis: emaComis, comisMembr: comisMembr};
        const query = connect.con.query('INSERT INTO comissoes SET ?', post, function(err, rows, fields) {
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
    const nomeComis = req.sanitize('nomeComis').escape();    
    const teleComis = req.sanitize('teleComis').escape();
    const emaComis = req.sanitize('emaComis').escape();
    const comisMembr = req.sanitize('comisMembr').escape();
    const idComis = req.sanitize('idComis').escape();
   
        
    req.checkBody("nomeComis", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("teleComis", "Insira número de telefone correcto").noEmpty();
    req.checkBody(" emaComis", "Insira um email correcto").isEmail();
    req.checkBody("comisMembr", "Membros").noEmpty();
    req.checkParams("idComis", "Insira um ID válido").isNumeric(); 
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idComis != "NULL" && typeof(nomeComis) != 'undefined' && typeof(teleComis) != 'undefined' && typeof(emaComis) != 'undefined' && typeof(comisMembr) != 'undefined') {
            const update = [nomeComis, teleComis, emaComis, comisMembr, idComis];
            const query = connect.con.query('UPDATE comissoes SET nomeComis =?, teleComis =?, emaComis =?, comisMembr =? WHERE idComis =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE comissoes SET active = ? WHERE idComis =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM comissoes WHERE idComis =?', update, function(err, rows, fields) {
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