const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idMovim, nomeMovim, teleMovim, emaMovim, movimDirec, histoMovim FROM movimentos order by idMovim desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idMovim, nomeMovim, teleMovim, emaMovim, movimDirec, histoMovim FROM movimentos where idMovim = ? order by idMovim desc ', post, function(err, rows, fields) {
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
    const nomeMovim = req.sanitize('nomeMovim').escape();    
    const teleMovim = req.sanitize('teleMovim').escape();
    const emaMovim = req.sanitize('emaMovim').escape();
    const movimDirec = req.sanitize('movimDirec').escape();
    const histoMovim = req.sanitize('histoMovimc').escape();
   
        
    req.checkBody("nomeMovim", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("teleMovim", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaMovim", "Insira um email correcto").isEmail();
    req.checkBody("movimDirec", "Direcção").noEmpty(); 
    req.checkBody("histoMovim", "Membros").noEmpty(); 
    const errors = req.validatiionErrors(); 
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (nomeMovim != "NULL" && teleMovim != "NULL" && emaMovim != "NULL" && movimDirec != "NULL" && histoMovim != "NULL" && typeof(nomeMovim) != 'undefined') {
        const post = { nomeMovim: nomeMovim, teleMovim: teleMovim, emaMovim: emaMovim, movimDirec: movimDirec, histoMovim: histoMovim};
        const query = connect.con.query('INSERT INTO movimentos SET ?', post, function(err, rows, fields) {
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
    const nomeMovim = req.sanitize('nomeMovim').escape();    
    const teleMovim = req.sanitize('teleMovim').escape();
    const emaMovim = req.sanitize('emaMovim').escape();
    const movimDirec = req.sanitize('movimDirec').escape();
    const histoMovim = req.sanitize('histoMovimc').escape();
    const idMovim = req.sanitize('idMovim').escape();
   
        
    req.checkBody("nomeMovim", "Insira apenas texto").matches(/^[a-z ] +$/i);    
    req.checkBody("teleMovim", "Insira número de telefone correcto").noEmpty();
    req.checkBody("emaMovim", "Insira um email correcto").isEmail();
    req.checkBody("movimDirec", "Insira um email correcto").noEmpty(); 
    req.checkBody("histoMovim", "Membros").noEmpty();
    req.checkParams("idMovim", "ID válido").isNumetic(); 
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idMovim != "NULL" && typeof(nomeMovim) != 'undefined' && typeof(teleMovim) != 'undefined' && typeof(emaMovim) != 'undefined' && typeof(movimDirec) != 'undefined' && typeof(histoMovim) != 'undefined') {
            const update = [nomeMovim, teleMovim, emaMovim, movimDirec, histoMovim, idMovim];
            const query = connect.con.query('UPDATE movimentos SET nomeMovim =?,  teleMovim =?, emaMovim =?, movimDirec =?, histoMovim =? WHERE idMovim =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE movimentos SET active = ? WHERE idMovim =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM movimentos WHERE idMovim =?', update, function(err, rows, fields) {
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