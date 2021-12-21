const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idPresb, fotoPresb, nomePresb, bioPresb FROM caridade order by idPresb desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idPresb, fotoPresb, nomePresb, bioPresb FROM presbiteros where idPresb = ? order by idPresb desc ', post, function(err, rows, fields) {
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
    const fotoPresb = req.sanitize('fotoPresb').escape();    
    const nomePresb = req.sanitize('nomePresb').escape();
    const bioPresb = req.sanitize('bioPresb').escape();
      
        
    req.checkBody("fotoPresb", "Fotografia do Bispo").noEmpty();   
    req.checkBody("nomePresb", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody(" bioPresb", "Texto").noEmpty();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoPresb != "NULL" && nomePresb != "NULL" && bioPresb != "NULL" && typeof(fotoPresb) != 'undefined') {
        const post = { fotoPresb: fotoPresb, nomePresb: nomePresb, bioPresb: bioPresb};
        const query = connect.con.query('INSERT INTO presbiteros SET ?', post, function(err, rows, fields) {
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
    const fotoPresb = req.sanitize('fotoPresb').escape();    
    const nomePresb = req.sanitize('nomePresb').escape();
    const bioPresb = req.sanitize('bioPresb').escape();
           
    req.checkBody("fotoPresb", "Fotografia do Bispo").noEmpty();   
    req.checkBody("nomePresb", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody(" bioPresb", "Texto").noEmpty();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idPresb != "NULL" && typeof(fotoPresb) != 'undefined' && typeof(nomePresb) != 'undefined' && typeof(bioPresb) != 'undefined') {
            const update = [fotoPresb, nomePresb, bioPresb, idPresb];
            const query = connect.con.query('UPDATE presbiteros SET fotoPresb =?, nomePresb =?, bioPresb =? WHERE idPresb =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE presbiteros SET active = ? WHERE idPresb =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM presbiteros WHERE idPresb =?', update, function(err, rows, fields) {
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