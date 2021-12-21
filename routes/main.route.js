const router = require('express').Router();
const controllerArcebispado = require('../controllers/arcebispado.controller.js');
const controllerAssociacao = require('../controllers/associacao.controller.js');
const controllerCaridade = require('../controllers/caridade.controller.js');
const controllerComissao = require('../controllers/comissao.controller.js');
const controlleCongregacao = require('../controllers/congregacao.controller.js');
const controllerDepartamento = require('../controllers/departamento.controller.js');
const controllerEnsinoFormacao = require('../controllers/ensinoFormacao.controller.js');
const controllerEspiritualidade = require('../controllers/espiritualidade.controller.js');
const controllerSantuario = require('../controllers/santuario.controller.js');
const controllerSeminario = require('../controllers/seminario.controller.js');
const controllerParoquia = require('../controllers/paroquia.controller.js');
const controllerMissao = require('../controllers/missao.controller.js');
const controllerBispo = require('../controllers/bispo.controller.js')
const controllerPresbitero = require('../controllers/presbitero.controller.js')
const controllerMail = require('../controllers/mail.controller.js')

//const { router } = require('../loader');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
router.get('/', function(req, res) {
    res.send("Missão no Huambo");
    res.end();
});

router.get('/arcebispado1/', controllerArcebispado.read);
router.get('/arcebispado1/:id', controllerArcebispado.readID);
router.get('/arcebispado1/', isLoggedIn, controllerArcebispado.save);
router.get('/arcebispado1/:id', isLoggedIn, isLoggedIn, controllerArcebispado.update);
router.put('/arcebispado1/del/:id', isLoggedIn, controllerArcebispado.deleteL);
router.delete('/arcebispado1/:id', isLoggedIn, controllerArcebispado.deleteF);

router.get('/associacoes/', controllerAssociacao.read);
router.get('/associacoes/:id', controllerAssociacao.readID);
router.get('/associacoes/', isLoggedIn, controllerAssociacao.save);
router.get('/associacoes/:id', isLoggedIn, isLoggedIn, controllerAssociacao.update);
router.put('/associacoes/del/:id', isLoggedIn, controllerAssociacao.deleteL);
router.delete('/associacoes/:id', isLoggedIn, controllerAssociacao.deleteF);

router.get('caridade1/', controllerCaridade.read);
router.get('/caridade1/:id', controllerCaridade.readID);
router.get('/caridade1/', isLoggedIn, controllerCaridade.save);
router.get('/caridade1/:id', isLoggedIn, isLoggedIn, controllerCaridade.update);
router.put('/caridade1/del/:id', isLoggedIn, controllerCaridade.deleteL);
router.delete('/caridade1/:id', isLoggedIn, controllerCaridade.deleteF);

router.get('/comissoes/', controllerComissao.read);
router.get('/comissoes/:id',  controllerComissao.readID);
router.get('/comissoes/', isLoggedIn,  controllerComissao.save);
router.get('comissoes/:id', isLoggedIn, isLoggedIn,  controllerComissao.update);
router.put('/comissoes/del/:id', isLoggedIn,  controllerComissao.deleteL);
router.delete('/comissoes/:id', isLoggedIn,  controllerComissao.deleteF);


router.get('/congregacoes/', controlleCongregacao.read);
router.get('/congregacoes/:id',  controlleCongregacao.readID);
router.get('/congregacoes/', isLoggedIn,  controlleCongregacao.save);
router.get('/congregacoes/:id', isLoggedIn, isLoggedIn,  controlleCongregacao.update);
router.put('/ccongregacoes/del/:id', isLoggedIn,  controlleCongregacao.deleteL);
router.delete('/congregacoes/:id', isLoggedIn,  controlleCongregacao.deleteF);

router.get('/departamentos/',  controllerDepartamento.read);
router.get('/departamentos/:id',   controllerDepartamento.readID);
router.get('/departamentos/', isLoggedIn,   controllerDepartamento.save);
router.get('/departamentos/:id', isLoggedIn, isLoggedIn,   controllerDepartamento.update);
router.put('/departamentos/del/:id', isLoggedIn,   controllerDepartamento.deleteL);
router.delete('/departamentos/:id', isLoggedIn,   controllerDepartamento.deleteF);


router.get('/ensinoFormacao1/', controllerEnsinoFormacao.read);
router.get('/ensinoFormacao1/:id',  controllerEnsinoFormacao.readID);
router.get('/ensinoFormacao1/', isLoggedIn,  controllerEnsinoFormacao.save);
router.get('/ensinoFormacao1/:id', isLoggedIn, isLoggedIn,  controllerEnsinoFormacao.update);
router.put('/ensinoFormacao1/del/:id', isLoggedIn,  controllerEnsinoFormacao.deleteL);
router.delete('/ensinoFormacao1/:id', isLoggedIn,  controllerEnsinoFormacao.deleteF);

router.get('/espiritualidade1/', controllerEspiritualidade.read);
router.get('/espiritualidade1/:id',  controllerEspiritualidade.readID);
router.get('espiritualidade1/', isLoggedIn,  controllerEspiritualidade.save);
router.get('/espiritualidade1/:id', isLoggedIn, isLoggedIn,  controllerEspiritualidade.update);
router.put('/espiritualidade1/del/:id', isLoggedIn,  controllerEspiritualidade.deleteL);
router.delete('/espiritualidade1/:id', isLoggedIn,  controllerEspiritualidade.deleteF);

router.get('/santuarios/', controllerSantuario.read);
router.get('/santuarios/:id',  controllerSantuario.readID);
router.get('/santuarios/', isLoggedIn,  controllerSantuario.save);
router.get('/santuarios/:id', isLoggedIn, isLoggedIn, controllerSantuario.update);
router.put('/santuarios/del/:id', isLoggedIn,  controllerSantuario.deleteL);
router.delete('/santuarios/:id', isLoggedIn,  controllerSantuario.deleteF);

router.get('/seminarios', controllerSeminario.read);
router.get('/seminarios/:id',  controllerSeminario.readID);
router.get('/seminarios/', isLoggedIn,  controllerSeminario.save);
router.get('/seminarios/:id', isLoggedIn, isLoggedIn,  controllerSeminario.update);
router.put('/seminarios/del/:id', isLoggedIn,  controllerSeminario.deleteL);
router.delete('/seminarios/:id', isLoggedIn,  controllerSeminario.deleteF);

router.get('/paroquias/', controllerParoquia.read);
router.get('/paroquias/:id',  controllerParoquia.readID);
router.get('/paroquias/', isLoggedIn,  controllerParoquia.save);
router.get('/paroquias/:id', isLoggedIn, isLoggedIn,  controllerParoquia.update);
router.put('/paroquias/del/:id', isLoggedIn,  controllerParoquia.deleteL);
router.delete('/paroquias/:id', isLoggedIn,  controllerParoquia.deleteF);

router.get('/missoes/', controllerMissao.read);
router.get('/missoes/:id',  controllerMissao.readID);
router.get('/missoes/', isLoggedIn,  controllerMissao.save);
router.get('missoes/:id', isLoggedIn, isLoggedIn,  controllerMissao.update);
router.put('/missoes/del/:id', isLoggedIn, controllerMissao.deleteL);
router.delete('/missoes/:id', isLoggedIn,  controllerMissao.deleteF);

router.get('/bispos/', controllerBispo.read);
router.get('/bispos/:id',  controllerBispo.readID);
router.get('/bispos/', isLoggedIn,  controllerBispo.save);
router.get('bispos/:id', isLoggedIn, isLoggedIn,  controllerBispo.update);
router.put('/bispos/del/:id', isLoggedIn, controllerBispo.deleteL);
router.delete('/bispos/:id', isLoggedIn,  controllerBispo.deleteF);

router.get('presbiteros/', controllerPresbitero.read);
router.get('/missoes/:id',  controllerPresbitero.readID);
router.get('/missoes/', isLoggedIn,  controllerPresbitero.save);
router.get('missoes/:id', isLoggedIn, isLoggedIn,  controllerPresbitero.update);
router.put('/missoes/del/:id', isLoggedIn, controllerPresbitero.deleteL);
router.delete('/missoes/:id', isLoggedIn,  controllerPresbitero.deleteF);


router.post('/contacts/emails', controllerMail.send);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(jsonMessages.login.unauthorized.status). send(jsonMessages.login.unauthorized);
        return next();
    }
}

