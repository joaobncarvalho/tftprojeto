var express = require('express');
var router = express.Router();
var gamesModel = require('../models/gamesModel');

/*VER ALGUNS JOGOS NA PÁGINA PRINCIPAL*/

router.get('/allgames', async function(req, res, next) {

    let result = await gamesModel.getGames();
    res.status(result.status).send(result.data);
  
});

router.get('/recentesgames', async function(req, res, next) {

  let result = await gamesModel.getRecentesGames();
  res.status(result.status).send(result.data);

});

router.get('/mostdownloaded', async function(req, res, next) {

  let result = await gamesModel.getMostDownloadedGames();
  res.status(result.status).send(result.data);

});

//OBTER TODAS AS PLATAFORMAS

router.get('/allplataforms', async function(req, res, next) {

  let result = await gamesModel.getPlatforms();
  res.status(result.status).send(result.data);

});

router.get('/allplataforms/verified/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  let result = await gamesModel.getPlatformsVerified(idutilizador);
  res.status(result.status).send(result.data);

});

router.get('/allplataforms/verify/:idutilizador/:idplataforma', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  let idplataforma = req.params.idplataforma;
  console.log("Retrieving games with id " + idutilizador + " and game with id: " + idplataforma);
  let result = await gamesModel.getPlatformasVerify(idutilizador, idplataforma);
  res.status(result.status).send(result.data);

});

  
/*router.get('/allgeneros', async function(req, res, next) {

    let result = await gamesModel.getAllGeneros();
    res.status(result.status).send(result.data);
  
});*/

router.get('/games/plataforma/:idplataforma', async function(req, res, next) {

  let idplatform = req.params.idplataforma;
  console.log("Retrieving games with id " + idplatform);
  let result = await gamesModel.getGamesFromPlatform(idplatform);
  res.status(result.status).send(result.data);

});

router.get('/games/genero/:idgenero', async function(req, res, next) {

    let idgenre = req.params.idgenero;
    console.log("Retrieving games with id " + idgenre);
    let result = await gamesModel.getGamesFromGenre(idgenre);
    res.status(result.status).send(result.data);

});

//FILTRAR JOGOS POR PLATAFORMA
  
router.get('/games/plataforma/:idplataforma', async function(req, res, next) {

    let idplataforma = req.params.idplataforma;
    console.log("Retrieving games with id " + idplataforma);
    let result = await gamesModel.getGamesFromPlatform(idplataforma);
    res.status(result.status).send(result.data);

});

//FILTRAR JOGOS COM MELHOR AVALIAÇÃO

router.get('/games/rating/best', async function(req, res, next) {

  let result = await gamesModel.getGamesBest();
  res.status(result.status).send(result.data);

});

router.get('/games/rating/worst', async function(req, res, next) {

  let result = await gamesModel.getGamesWorst();
  res.status(result.status).send(result.data);

});

//FILTRAR JOGOS PELOS MAIS RECENTES (DATA DE LANÇAMENTO)

router.get('/games/lancamento/recentes', async function(req, res, next) {

  let result = await gamesModel.getGamesRecent();
  res.status(result.status).send(result.data);

});



//FILTRAR JOGOS PELOS MAIS ANTIGOS (DATA DE LANÇAMENTO)

router.get('/games/lancamento/antigos', async function(req, res, next) {

  let result = await gamesModel.getGamesOlder();
  res.status(result.status).send(result.data);

});

router.get('/games/favorite/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving games with id " + idutilizador);
  let result = await gamesModel.getGamesFromFavorite(idutilizador);
  res.status(result.status).send(result.data);

});



  //POST DE WISHLIST  (REFAZER)

  router.post('/insertnewgamewishlist', async function(req, res, next) {
    let newGame = req.body;
    //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
    let result = await gamesModel.saveGameWishlist(newGame);
    res.status(result.status).send(result.result);
  });


  router.post('/insertnewgamelibrary', async function(req, res, next) {
    let newGame = req.body;
    //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
    let result = await gamesModel.saveGameLibrary(newGame);
    res.status(result.status).send(result.result);
  });

  router.post('/insertnewgamefavorite', async function(req, res, next) {
    let newGame = req.body;
    //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
    let result = await gamesModel.saveGamingtoFav(newGame);
    res.status(result.status).send(result.result);
  });

  router.post('/followplatform', async function(req, res, next) {
    let newGame = req.body;
    //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
    let result = await gamesModel.saveGamePlatform(newGame);
    res.status(result.status).send(result.result);
  });
  
  //GET LIBRARY GAMES


  router.get('/library/:idutilizador', async function(req, res, next) {

    let idutilizador = req.params.idutilizador;
    console.log("Retrieving games with id " + idutilizador);
    let result = await gamesModel.getGamesFromLibrary(idutilizador);
    res.status(result.status).send(result.data);

});


  //GET WISHLIST GAMES


  router.get('/wishlist/:idutilizador', async function(req, res, next) {

    let idutilizador = req.params.idutilizador;
    console.log("Retrieving games with id " + idutilizador);
    let result = await gamesModel.getGamesFromWishlist(idutilizador);
    res.status(result.status).send(result.data);

});

router.get('/favorite/quantity/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving games with id " + idutilizador);
  let result = await gamesModel.getCountFavoriteGames(idutilizador);
  res.status(result.status).send(result.data);

});

router.get('/wishlist/quantity/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving games with id " + idutilizador);
  let result = await gamesModel.getCountWishlistGames(idutilizador);
  res.status(result.status).send(result.data);

});

router.get('/library/quantity/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving games with id " + idutilizador);
  let result = await gamesModel.getCountLibraryGames(idutilizador);
  res.status(result.status).send(result.data);

});


//OBTER OS 4 JOGOS RECENTEMENTE COMPRADOS

router.get('/recent/:idutilizador', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  console.log("Retrieving games with id " + idutilizador);
  let result = await gamesModel.getRecentGames(idutilizador);
  res.status(result.status).send(result.data);

});

//DELETE WISHLIST GAME

router.delete('/deletewishlist/:idwishlist', async function(req, res, next){

  let wishlist_id = req.params.idwishlist;
  console.log("[artigosRoutes] Deleting wishlist game with id: " + wishlist_id);
  let result = await gamesModel.deleteWishlistGame(wishlist_id);
  res.status(result.status).send(result.data);

});

router.delete('/deletefavorite/:idfavorite', async function(req, res, next){ //COMO RESOLVER?

  let favorite_id = req.params.idfavorite;
  console.log("[artigosRoutes] Deleting favorite game with id: " + favorite_id);
  let result = await gamesModel.deleting(favorite_id);
  res.status(result.status).send(result.data);

});

router.delete('/unfollowplatform/:idplatformfollow', async function(req, res, next){ //COMO RESOLVER?

  let idplatform_follow = req.params.idplatformfollow;
  console.log("[artigosRoutes] Deleting favorite game with id: " + idplatform_follow);
  let result = await gamesModel.deletingFollowPlatform(idplatform_follow);
  res.status(result.status).send(result.data);

});


//ADICIONAR JOGO AOS FAVORITOS DO UTILIZADOR (TERMINAR AMANHÃ | ATRAVÉS DA LIVRARIA)

router.post('/addgamefavorites/:idutilizador/:idjogo', async function(req, res, next) {
  let utilizador_id = req.params.idutilizador;
  let jogo_id = req.params.idjogo;
  //let newBuyGame = req.body;
  //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
  let result = await gamesModel.saveGameFavoritos(utilizador_id, jogo_id);
  res.status(result.status).send(result.result);
});



//VERIFICAR COMPRA PARA ADICIONAR AOS FAVORITOS

router.get('/verifygame/:idutilizador/:idjogo', async function(req, res, next) {

  let idutilizador = req.params.idutilizador;
  let idjogo = req.params.idjogo;
  console.log("Retrieving games with id " + idutilizador + " and game with id: " + idjogo);
  let result = await gamesModel.getGamesVerify(idutilizador, idjogo);
  res.status(result.status).send(result.data);

});

//COMPRAR JOGO (ADQUIRIR JOGO)

router.post('/addgame/:idutilizador/:idjogo', async function(req, res, next) {
    let utilizador_id = req.params.idutilizador;
    let jogo_id = req.params.idjogo;
    //let newBuyGame = req.body;
    //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
    let result = await gamesModel.saveGame(utilizador_id, jogo_id);
    res.status(result.status).send(result.result);
  });

  //FILTRAR JOGOS POR LOJA (TERMINAR AMANHA)

  router.get('/gameswishlist/:idutilizador', async function(req, res, next) {

    let idutilizador = req.params.idutilizador;
    console.log("Retrieving games with id " + idutilizador);
    let result = await gamesModel.getGamesWishlist(idutilizador);
    res.status(result.status).send(result.data);

});

  //GET DOS JOGOS FAVORITOS 

  router.get('/gamesfavorite/:idutilizador', async function(req, res, next) {

    let idutilizador = req.params.idutilizador;
    console.log("Retrieving games with id " + idutilizador);
    let result = await gamesModel.getGamesFavorito(idutilizador);
    res.status(result.status).send(result.data);

});

  //GET DOS JOGOS DA WISHLIST

  router.get('/gameswishlist/:idutilizador', async function(req, res, next) {

    let idutilizador = req.params.idutilizador;
    console.log("Retrieving games with id " + idutilizador);
    let result = await gamesModel.getGamesWishlist(idutilizador);
    res.status(result.status).send(result.data);

});

  //APAGAR JOGOS DA WISHLIST

  router.delete('/gamesfavorite/delete/:idutilizador/:idgame', async function(req, res, next){

    let id_utilizador = req.params.idutilizador;
    let id_game = req.params.idgame;

    let result = await gamesModel.deleteFavoriteGame(id_utilizador, id_game);
    res.status(result.status).send(result.data);

});

//ADICIONAR UM JOGO (TESTE)

router.post('/insertnewgame', async function(req, res, next) {
  let newGame = req.body;
  //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
  let result = await gamesModel.saveGame(newGame);
  res.status(result.status).send(result.result);
});


  //APAGAR JOGOS DOS FAVORITOS

  router.delete('/gameswishlist/delete/:idutilizador/:idgame', async function(req, res, next){

    let id_utilizador = req.params.idutilizador;
    let id_game = req.params.idgame;

    let result = await gamesModel.deleteWishlistGame(id_utilizador, id_game);
    res.status(result.status).send(result.data);

});

  // FILTRAR JOGOS POR RANKING (ASCENDENTE & DESCENDENTE)

  router.get('/gamesranking/ascendente', async function(req, res, next) {

    let result = await gamesModel.getGamesRankingAsc();
    res.status(result.status).send(result.data);

});

router.get('/gamesranking/descendente', async function(req, res, next) {

    let result = await gamesModel.getGamesRankingDesc();
    res.status(result.status).send(result.data);

});

  //MOSTRAR DETALHES DE UM JOGO (REQUISITOS, PLATAFORMAS, GENEROS, LOJAS, DESCRICAO, RANKING, ETC).

  router.get('/gamesdetails/:idjogo', async function(req, res, next) {

    let idjogo = req.params.idjogo;
    console.log("Retrieving games with id " + idjogo);
    let result = await gamesModel.getGamesDetails(idjogo);
    res.status(result.status).send(result.data);

});

  //MOSTRAR DETALHES DO JOGADOR (JOGOS ADQUIRIDOS MAIS RECENTEMENTE, PLATAFORMAS QUE SEGUE, QUANTOS JOGOS FAVORITOS TEM, QUANTOS JOGOS TEM NA WISHLIST, EMAIL E USERNAME DA CONTA)

  // JOGOS ADQUIRIDOS RECENTEMENTE POR UM UTILIZADOR


  // PLATAFORMAS QUE SEGUE


  // QUANTOS FAVORITOS TEM (UTILIZANDO COUNT)

  // QUANTOS JOGOS TEM NA WISHLIST (UTILIZANDO COUNT)

  //QUANTOS JOGOS TEM NOS FAVORITOS (UTILIZANDO COUNT)

  



  module.exports = router;
