const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idBispo, fotoBispo, nomeBispo, bioBispo FROM caridade order by idBispo desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idBispo, fotoBispo, nomeBispo, bioBispo FROM bispos where idBispo = ? order by idBispo desc ', post, function(err, rows, fields) {
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
    const fotoBispo = req.sanitize('fotoBispo').escape();    
    const nomeBispo = req.sanitize('nomeBispo').escape();
    const bioBispo = req.sanitize('bioBispo').escape();
      
        
    req.checkBody("fotoBispo", "Fotografia do Bispo").noEmpty();   
    req.checkBody("nomeBispo", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody(" bioBispo", "Texto").noEmpty();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoBispo != "NULL" && nomeBispo != "NULL" && bioBispo != "NULL" && typeof(fotoBispo) != 'undefined') {
        const post = { fotoBispo: fotoBispo, nomeBispo: nomeBispo, bioBispo: bioBispo};
        const query = connect.con.query('INSERT INTO bispos SET ?', post, function(err, rows, fields) {
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
    const fotoBispo = req.sanitize('fotoBispo').escape();    
    const nomeBispo = req.sanitize('nomeBispo').escape();
    const bioBispo = req.sanitize('bioBispo').escape();
           
    req.checkBody("fotoBispo", "Fotografia do Bispo").noEmpty();   
    req.checkBody("nomeBispo", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody(" bioBispo", "Texto").noEmpty();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idBispo != "NULL" && typeof(fotoBispo) != 'undefined' && typeof(nomeBispo) != 'undefined' && typeof(bioBispo) != 'undefined') {
            const update = [fotoBispo, nomeBispo, bioBispo, idBispo];
            const query = connect.con.query('UPDATE bispos SET fotoBispo =?, nomeBispo =?, bioBispo =? WHERE idBispo =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE bispos SET active = ? WHERE idBispo =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM bispos WHERE idBispo =?', update, function(err, rows, fields) {
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