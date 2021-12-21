const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idDepart, nomeDepart, endeDepart, teleDepart, emaDepart, departMembr FROM departamentos order by idDepart desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idDepart, nomeDepart, endeDepart, teleDepart, emaDepart, departMembr FROM departamentos where idDepart = ? order by idDepart desc ', post, function(err, rows, fields) {
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
    const nomeDepart = req.sanitize('nomeDepart').escape();    
    const endeDepart = req.sanitize('endeDepart').escape();
    const teleDepart = req.sanitize('teleDepart').escape();
    const emaDepart = req.sanitize('emaDepart').escape();
    const departMembr = req.sanitize('departMembrc').escape();
   
        
    req.checkBody("nomeDepart", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("endeDepart", "Insira número de telefone correcto").noEmpty();
    req.checkBody("teleDepart", "Insira um email correcto").isEmail();
    req.checkBody("emaDepart", "Insira um email correcto").noEmpty(); 
    req.checkBody("departMembr", "Membros").noEmpty(); 
    const errors = req.validatiionErrors(); 
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (nomeDepart != "NULL" && endeDepart != "NULL" && teleDepart != "NULL" && emaDepart != "NULL" && departMembr != "NULL" && typeof(nomeDepart) != 'undefined') {
        const post = { nomeDepart: nomeDepart, endeDepart: endeDepart, teleDepart: teleDepart, emaDepart: emaDepart, departMembr: departMembr};
        const query = connect.con.query('INSERT INTO departamentos SET ?', post, function(err, rows, fields) {
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
    const nomeDepart = req.sanitize('nomeDepart').escape();    
    const endeDepart = req.sanitize('endeDepart').escape();
    const teleDepart = req.sanitize('teleDepart').escape();
    const emaDepart = req.sanitize('emaDepart').escape();
    const departMembr = req.sanitize('departMembrc').escape();
    const idDepart = req.sanitize('idDepart').escape();
   
        
    req.checkBody("nomeDepart", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("endeDepart", "Insira número de telefone correcto").noEmpty();
    req.checkBody("teleDepart", "Insira um email correcto").isEmail();
    req.checkBody("emaDepart", "Insira um email correcto").noEmpty(); 
    req.checkBody("departMembr", "Membros").noEmpty();
    req.checkParams("idDepart", "ID válido").isNumetic(); 
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idDepart != "NULL" && typeof(nomeDepart) != 'undefined' && typeof(endeDepart) != 'undefined' && typeof(teleDepart) != 'undefined' && typeof(emaDepart) != 'undefined' && typeof(departMembr) != 'undefined') {
            const update = [nomeDepart, endeDepart, teleDepart, emaDepart, departMembr, idDepart];
            const query = connect.con.query('UPDATE departamentos SET nomeDepart =?,  endeDepart =?, teleDepart =?, emaDepart =?, departMembr =? WHERE idDepart =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE departamentos SET active = ? WHERE idDepart =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM departamentos WHERE idDepart =?', update, function(err, rows, fields) {
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