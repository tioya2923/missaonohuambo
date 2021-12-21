const connect = require('../config/connectyMySQL.js')
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.con.query('SELECT idCaritas, fotoCaritas, nomeCaritas, endeCaritas, teleCaritas, emaCaritas, caritasDirec, histoCaritas FROM caridade order by idCaritas desc', function(err, rows, fields) {
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
    const query = connect.con.query('SELECT idCaritas, fotoCaritas, nomeCaritas, endeCaritas, teleCaritas, emaCaritas, caritasDirec, histoCaritas FROM caridade where idCaritas = ? order by idCaritas desc ', post, function(err, rows, fields) {
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
    const fotoCaritas = req.sanitize('fotoCaritas').escape();
    const nomeCaritas = req.sanitize('nomeCaritas').escape();
    const endeCaritas = req.sanitize('endeCaritas').escape();
    const teleCaritas = req.sanitize('teleCaritas').escape();
    const emaCaritas = req.sanitize('emaCaritas').escape();
    const caritasDirec = req.sanitize('caritasDirec').escape();
    const histoCaritas = req.sanitize('histoCaritas').escape();
    
    
    req.checkBody("fotoCaritas", "Insira uma imagem").optional();
    req.checkBody("nomeCaritas", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeCaritas", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleCaritas", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaCaritas", "Insira um email correcto").isEmail();
    req.checkBody("caritasDirec", "Direcção").noEmpty();
    req.checkBody("histoCaritas", "História sobre").optional();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }

    else {

    if (fotoCaritas != "NULL" && nomeCaritas != "NULL" && endeCaritas != "NULL" && teleCaritas != "NULL" && emaCaritas != "NULL" && caritasDirec != "NULL" && histoCaritas != "NULL" && typeof(nomeCaritas) != 'undefined') {
        const post = { fotoCaritas: fotoCaritas, nomeCaritas: nomeCaritas, endeCaritas: endeCaritas, teleCaritas: teleCaritas, emaCaritas: emaCaritas, caritasDirec: caritasDirec, histoCaritas: histoCaritas };
        const query = connect.con.query('INSERT INTO caridade SET ?', post, function(err, rows, fields) {
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
    const fotoCaritas = req.sanitize('fotoCaritas').escape();
    const nomeCaritas = req.sanitize('nomeCaritas').escape();
    const endeCaritas = req.sanitize('endeCaritas').escape();
    const teleCaritas = req.sanitize('teleCaritas').escape();
    const emaCaritas = req.sanitize('emaCaritas').escape();
    const caritasDirec = req.sanitize('caritasDirec').escape();
    const histoCaritas = req.sanitize('histoCaritas').escape();
    const idCaritas = req.sanitize('idCaritas').escape();   
    
    req.checkBody("fotoCaritas", "Insira uma imagem").optional();
    req.checkBody("nomeCaritas", "Insira apenas texto").matches(/^[a-z ] +$/i);
    req.checkBody("endeCaritas", "Insira um endereço correcto").noEmpty();
    req.checkBody("teleCaritas", "Insira número de telefone correcto").isNumeric();
    req.checkBody("emaCaritas", "Insira um email correcto").isEmail();
    req.checkBody("caritasDirec", "Direcção").noEmpty();
    req.checkBody("histoCaritas", "História sobre").optional();
    req.checkParams("idCaritas", "insira um ID válido").isNumeric();
    const errors = req.validatiionErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (idCaritas != "NULL" && typeof(fotoCaritas) != 'undefined' && typeof(nomeCaritas) != 'undefined' && typeof(endeCaritas) != 'undefined' && typeof(teleCaritas) != 'undefined' && typeof(emaCaritas) != 'undefined' && typeof(caritasDirec) != 'undefined' && typeof(histoCaritas) != 'undefined') {
            const update = [fotoCaritas, nomeCaritas, endeCaritas, teleCaritas, emaCaritas, caritasDirec, histoCaritas, idCaritas];
            const query = connect.con.query('UPDATE caridade SET fotoCaritas =?, nomeCaritas =?, endeCaritas =?, teleCaritas =?, emaCaritas =?, caritasDirec =? histoCaritas =? WHERE idCaritas =?', update, function(err, rows, fields) {
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
    const query = connect.con.query('UPDATE caridade SET active = ? WHERE idCaritas=?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM caridade WHERE idCaritas=?', update, function(err, rows, fields) {
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