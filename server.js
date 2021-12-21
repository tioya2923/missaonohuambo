//sentings

const PORT = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.0.1';

const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const axios = require('axios')

app.use(cors({
    exposedHeaders: ['Location'],
}));


app.get('/', async(req, res ) => {
    const {data} = await axios('http://localhost:3000/');
    return res.json(data)
})




// rotas estáticas 

app.get('/', (req, res) => {
    res.json({ message: 'okay está tudo a funcionar'});
});


app.use('/assets', express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
//app.use('/views', express.static('views'));


/*
app.listen(PORT, function(err) {
    if (!err) {
        console.log('Missão is listening on ' +  host + ' and port ' + PORT);
    }
    else {
        console.log(err);
    }
});
*/

app.listen(PORT, () => console.log(`Missão is listening in host ${host} and the port ${ PORT }`));

module.exports = app;
require('./loader');