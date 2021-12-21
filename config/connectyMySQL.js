const mysql = require('mysql2');
module.exports = {
    con: mysql.createConnection({
        host        :'localhost',
        user        :'root',
        password    :'19101989Jodu!',
        database    :'missaohbo'
    })
};