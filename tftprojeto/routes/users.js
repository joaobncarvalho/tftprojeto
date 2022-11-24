var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing.*/ 
router.get('/uss', function(req, res, next) {
  let users=[{name:"John Doe", birthDate:"19/02/1999"}]; 
  res.send(users); 
});

/**/ 

router.get('/dd', function(req, res, next) {

res.send("Ola Mundo");

});

router.put('/reduceprice/:idutilizador/:numeropontosaretirar', async function(req, res, next) {

  let id_utilizador = req.params.idutilizador;
  let numeropontosretirar = req.params.numeropontosaretirar;

  let result = await usersModel.updatePontosUtilizador(id_utilizador, numeropontosretirar);
  res.status(result.status).send(result.data);

});



/*Obter todos os utilizadores registados*/

router.get('/allusers', async function(req, res, next) {

  let result = await usersModel.getUsers();
  res.status(result.status).send(result.data);

});

/*Registo de um novo utilizador*/

router.post('/insertnewuser', async function(req, res, next) {
  let newUser = req.body;
  //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
  let result = await usersModel.saveUser(newUser);
  res.status(result.status).send(result.result);
});

/*Login de utilizador - VERIFICAR POSTERIORMENTE SE FUNCIONA CORRETAMENTE*/

router.post('/loginuser', async function(req, res, next){
  let user = req.body;
  console.log("username = " + JSON.stringify(user));

  let result = await usersModel.authUser(user);
  res.status(result.status).send(result.result);

});

//EXIBIR EMAIL,USERNAME E TOKENS (DINHEIRO)

router.get('/details/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving user details with id " + idutilizador);
  let result = await usersModel.getUserDetails(idutilizador);
  res.status(result.status).send(result.data);

});

//LOGIN USER

router.post('/loginuser', async function(req, res, next){
  let utilizador_name = req.body;
  console.log("username = " + JSON.stringify(utilizador_name));

  let result = await usersModel.authUser(utilizador_name);
  res.status(result.status).send(result.result);

});


module.exports = router;
