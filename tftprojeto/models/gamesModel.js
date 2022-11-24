const { response } = require("express");
var pool = require("./connection");
var brcypt = require('bcrypt');
var salt = 10;

// ADICIONAR JOGO Á WISHLIST



//OBTER JOGOS ALEATÓRIOS

module.exports.getGames = async function() {
    try {
        let sql = "select * from jogo order by random() limit 50"; //FALTA ALTERAR O LIMITE PARA 50 (TEREMOS 150/200 JOGOS HARDCODED NO TOTAL)
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

///// GET PLATFORMS

module.exports.getPlatforms = async function() {
    try {
        let sql = "SELECT * FROM plataforma"; 
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getGamesBest = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_rating DESC"; 
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesWorst = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_rating ASC"; 
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getGamesRecent = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_released DESC"; 
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesOlder = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_released ASC"; 
        let result = await pool.query(sql);
        let games = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(games));
        return { status: 200, data: games };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//EXIBIR TODOS OS GÉNEROS (POSTERIORMENTE ATRAVÉS DE UMA LISTA)

module.exports.getAllGeneros = async function() {
    try {
        let sql = "select * from genero"; //FALTA ALTERAR O LIMITE PARA 50 (TEREMOS 150/200 JOGOS HARDCODED NO TOTAL)
        let result = await pool.query(sql);
        let generos = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(generos));
        return { status: 200, data: generos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//OBTER TODOS OS JOGOS DE ALGUNS JOGOS DE UMA PLATAFORMA

module.exports.getGamesFromPlatform = async function(plataform_id) {
    try {
        let sql = "SELECT plataforma_jogo.jogo_identifier, plataforma_jogo.plataforma_identifier, jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_rating, plataforma.plataforma_id, plataforma.plataforma_name FROM plataforma_jogo INNER JOIN jogo ON jogo.jogo_id = plataforma_jogo.jogo_identifier INNER JOIN plataforma ON plataforma.plataforma_id = plataforma_jogo.plataforma_identifier WHERE plataforma.plataforma_id = " + plataform_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesplatform = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//OBTER TODOS OS JOGOS DE ALGUNS JOGOS DE UM GÉNERO 

module.exports.getGamesFromGenre = async function(genre_id) {
    try {
        let sql = "SELECT jogo_genero.game_id, jogo_genero.genre_id, jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_rating, genero.id_genero, genero.name_genero FROM jogo_genero INNER JOIN jogo ON jogo.jogo_id = jogo_genero.game_id INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id WHERE genero.id_genero = " + genre_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesgenre = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//FILTRAR JOGOS POR PLATAFORMA

module.exports.getGamesFromPlatform = async function(platform_id) {
    try {
        let sql = "SELECT plataforma_jogo.plataforma_identifier, plataforma_jogo.jogo_identifier, jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_rating, plataforma.plataforma_id, plataforma.plataforma_name FROM plataforma_jogo INNER JOIN jogo ON jogo.jogo_id = plataforma_jogo.jogo_identifier INNER JOIN plataforma ON plataforma.plataforma_id = plataforma_jogo.plataforma_identifier WHERE plataforma.plataforma_id = " + platform_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesplatform = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//FILTRAR JOGOS MAIS RECENTES ADICIONADOS / LANÇADOS

//ADQUIRIR JOGO

module.exports.saveGame = async function(user_id, game_id) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    //let password = brcypt.hashSync(user.user_password, salt);
    try {

        let sql =
            "INSERT " +
            "INTO utilizador_jogo " +
            "(id_utilizador, id_jogo) " +
            "VALUES ($1, $2) " +
            "RETURNING id_compra";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        //let result = await pool.query(sql, [newgame.id_utilizador, newgame.id_jogo]);
        let result = await pool.query(sql, [user_id, game_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.saveGameWishlist = async function(game) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
     //checks all fields needed and ignores other fields
    /*if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    let password = brcypt.hashSync(user.user_password, salt);*/
    try {

        let sql =
            "INSERT " +
            "INTO wishlist " +
            "(wishlist_user_id, wishlist_jogo_id) " +
            "VALUES ($1, $2) " +
            "RETURNING wishlist_id";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [game.wishlist_user_id, game.wishlist_jogo_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}


module.exports.saveGamingtoFav = async function(game) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
     //checks all fields needed and ignores other fields
    /*if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    let password = brcypt.hashSync(user.user_password, salt);*/
    try {

        let sql = "INSERT" + 
                  " INTO favorito " + 
                  "(favorite_user_id, favorite_jogo_id) " + 
                  "VALUES ($1, $2) " + 
                  "RETURNING favorite_id"

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [game.favorite_user_id, game.favorite_jogo_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.saveGameLibrary = async function(game) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
     //checks all fields needed and ignores other fields
    /*if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    let password = brcypt.hashSync(user.user_password, salt);*/
    try {

        let sql =
            "INSERT " +
            "INTO utilizador_jogo " +
            "(id_utilizador, id_jogo) " +
            "VALUES ($1, $2) " +
            "RETURNING id_compra";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [game.id_utilizador, game.id_jogo]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}


module.exports.getGamesFromWishlist = async function(utilizador_id) {
    try {
        let sql = "SELECT wishlist.wishlist_id, wishlist.wishlist_user_id, wishlist.wishlist_jogo_id, utilizador.utilizador_name, utilizador.utilizador_id, jogo.jogo_id ,jogo.jogo_name, jogo.jogo_rating, jogo.jogo_downloads, jogo.jogo_released FROM wishlist INNER JOIN utilizador ON utilizador.utilizador_id = wishlist.wishlist_user_id INNER JOIN jogo ON jogo.jogo_id = wishlist.wishlist_jogo_id WHERE utilizador.utilizador_id = " + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesFromLibrary = async function(utilizador_id) {
    try {
        let sql = "SELECT utilizador_jogo.id_compra, utilizador_jogo.id_utilizador, utilizador_jogo.id_jogo, utilizador.utilizador_name, utilizador.utilizador_id, jogo.jogo_id, jogo.jogo_name, jogo.jogo_rating, jogo.jogo_downloads, jogo.jogo_released FROM utilizador_jogo INNER JOIN utilizador ON utilizador.utilizador_id = utilizador_jogo.id_utilizador INNER JOIN jogo ON jogo.jogo_id = utilizador_jogo.id_jogo WHERE utilizador.utilizador_id = " + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesFromFavorite = async function(utilizador_id) {
    try {
        let sql = "SELECT favorito.favorite_id, favorito.favorite_user_id, favorito.favorite_jogo_id, utilizador.utilizador_name, utilizador.utilizador_id, jogo.jogo_id ,jogo.jogo_name, jogo.jogo_rating, jogo.jogo_downloads, jogo.jogo_released FROM favorito INNER JOIN utilizador ON utilizador.utilizador_id = favorito.favorite_user_id INNER JOIN jogo on jogo.jogo_Id = favorito.favorite_jogo_id WHERE utilizador.utilizador_id = " + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

///////////////////////////////////////////////////////////////////////

module.exports.getCountFavoriteGames  = async function(utilizador_id) {
    try {
        let sql = "SELECT COUNT(*) FROM favorito WHERE favorito.favorite_user_id =" + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCountWishlistGames  = async function(utilizador_id) {
    try {
        let sql = "SELECT COUNT(*) FROM wishlist WHERE wishlist.wishlist_user_id =" + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCountLibraryGames  = async function(utilizador_id) {
    try {
        let sql = "SELECT COUNT(*) FROM utilizador_jogo WHERE utilizador_jogo.id_utilizador =" + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.deleteWishlistGame = async function(wishlist_id) {
    try {
        let sql = "DELETE FROM wishlist WHERE wishlist.wishlist_id= " + wishlist_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.deleting = async function(favorite_id) {
    try {

        console.log("Calling SQL query");
        let sql = "DELETE FROM favorito WHERE favorito.favorite_id= " + favorite_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.deletingFollowPlatform = async function(platform_follow_id) {
    try {

        console.log("Calling SQL query");
        let sql = "DELETE FROM plataforma_follow WHERE plataforma_follow.plataforma_id_follow= " + platform_follow_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getGamesRankingAsc = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_released ASC"; 
        let result = await pool.query(sql);
        let rankingasc = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(rankingasc));
        return { status: 200, data: rankingasc };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesRankingDesc = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_released DESC"; 
        let result = await pool.query(sql);
        let rankingdesc = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(rankingdesc));
        return { status: 200, data: rankingdesc };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.deleteFavoriteGame = async function(utilizador_id, jogo_id) {
    try {
        let sql = "DELETE FROM favorito WHERE favorite_user_id = " + utilizador_id + " AND favorite_jogo_id = " + jogo_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gameswishlist = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.saveGameFavoritos = async function(user_id, game_id) {
  
    try {

        let sql =
            "INSERT " +
            "INTO favorito " +
            "(favorite_user_id, favorite_jogo_id) " +
            "VALUES ($1, $2) " +
            "RETURNING favorite_id";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        //let result = await pool.query(sql, [newgame.id_utilizador, newgame.id_jogo]);
        let result = await pool.query(sql, [user_id, game_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

//ADICIONAR UM JOGO (TESTE)

module.exports.saveGame = async function(jogo) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
     //checks all fields needed and ignores other fields
    /*if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    let password = brcypt.hashSync(user.user_password, salt);*/
    try {

        let sql =
            "INSERT " +
            "INTO jogo " +
            "(jogo_name, jogo_released, jogo_rating, jogo_preco, jogo_downloads, jogo_desc, jogo_link) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7) " +
            "RETURNING jogo_id";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [jogo.jogo_name, jogo.jogo_released, jogo.jogo_rating, jogo.jogo_preco, jogo.jogo_downloads, jogo.jogo_desc, jogo.jogo_link]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.saveGamePlatform = async function(jogo) {
    //console.log("[usersModel.saveUser] user = " + JSON.stringify(user));
     //checks all fields needed and ignores other fields
    /*if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }
    let password = brcypt.hashSync(user.user_password, salt);*/
    try {

        let sql =
            "INSERT " +
            "INTO plataforma_follow " +
            "(plataforma_user_id, plataforma_identifier) " +
            "VALUES ($1, $2) " +
            "RETURNING plataforma_id_follow";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [jogo.plataforma_user_id, jogo.plataforma_identifier]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

//VERIFICAR SE UM JOGO ESTÁ COMPRADO ASSIM QUE FOR CLICADO PARA ADICIONAR AOS FAVORITOS

module.exports.getGamesRankingDesc = async function() {
    try {
        let sql = "SELECT * FROM jogo ORDER BY jogo.jogo_released DESC"; 
        let result = await pool.query(sql);
        let rankingdesc = result.rows;
        console.log("[gamesModel.getGames] games = " + JSON.stringify(rankingdesc));
        return { status: 200, data: rankingdesc };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//SÓ OS JOGOS ADQUIRIDOS PODEM SER ADICIONADOS AOS FAVORITOS

module.exports.getGamesVerify = async function(utilizador_id, jogo_id) {
    try {
        let sql = "SELECT * FROM favorito WHERE favorito.favorite_user_id = " + utilizador_id + " AND favorito.favorite_jogo_id = " + jogo_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesfavorite = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getPlatformasVerify = async function(utilizador_id, plataforma_id) {
    try {
        let sql = "SELECT * FROM plataforma_follow WHERE plataforma_user_id =" + utilizador_id + " AND plataforma_identifier = " + plataforma_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesfavorite = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getPlatformsVerified = async function(utilizador_id) {
    try {
        let sql = "SELECT plataforma_follow.plataforma_id_follow, plataforma_follow.plataforma_user_id, plataforma_follow.plataforma_identifier, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_email, plataforma.plataforma_id, plataforma.plataforma_name FROM plataforma_follow INNER JOIN utilizador ON utilizador.utilizador_id = plataforma_follow.plataforma_user_id INNER JOIN plataforma ON plataforma.plataforma_id = plataforma_follow.plataforma_identifier WHERE utilizador.utilizador_id = " + utilizador_id;
        let result = await pool.query(sql);
        let gamesfoundverified = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesfavorite = " + JSON.stringify(gamesfoundverified));
        return { status: 200, data: gamesfoundverified };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesFavorito = async function(utilizador_id) {
    try {
        let sql = "SELECT favorito.favorite_user_id, favorito.favorite_jogo_id, utilizador.utilizador_id, utilizador.utilizador_name, jogo.jogo_name, jogo.jogo_rating, jogo.jogo_downloads, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero FROM favorito INNER JOIN utilizador ON utilizador.utilizador_id = favorito.favorite_user_id INNER JOIN jogo ON jogo.jogo_id = favorito.favorite_jogo_id INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id WHERE utilizador.utilizador_id = " + utilizador_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesfavorite = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGamesDetails = async function(jogo_id) {
    try {
        let sql = "SELECT jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_preco, jogo.jogo_downloads, jogo.jogo_desc, jogo.jogo_link, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero, requisito.requisito_id, requisito.req_minimo, requisito.req_recomendado, requisito.req_jogo_id, jogo_loja.jogo_loja_id, jogo_loja.loja_identifier, jogo_loja.jogo_identifier, loja.loja_nome, loja.loja_domain, plataforma_jogo.plataforma_jogo_id, plataforma_jogo.plataforma_identifier, plataforma_jogo.jogo_identifier, plataforma.plataforma_id, plataforma_name FROM jogo INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id INNER JOIN jogo_loja ON jogo_loja.jogo_identifier = jogo.jogo_id INNER JOIN loja ON loja.loja_id = jogo_loja.loja_identifier INNER JOIN plataforma_jogo ON plataforma_jogo.jogo_identifier = jogo.jogo_id INNER JOIN plataforma ON plataforma.plataforma_id = plataforma_jogo.plataforma_identifier INNER JOIN requisito ON requisito.req_jogo_id = jogo.jogo_id WHERE jogo.jogo_id = " + jogo_id;
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesfavorite = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRecentGames = async function(utilizador_id) {
    try {
        let sql = "SELECT utilizador_jogo.id_utilizador, utilizador_jogo.id_jogo, utilizador.utilizador_id, utilizador.utilizador_name, jogo.jogo_name, jogo.jogo_rating, jogo.jogo_released, jogo.jogo_downloads FROM utilizador_jogo INNER JOIN utilizador ON utilizador.utilizador_id = utilizador_jogo.id_utilizador INNER JOIN jogo ON jogo.jogo_id = utilizador_jogo.id_jogo WHERE utilizador_jogo.id_utilizador = " + utilizador_id + " ORDER BY utilizador_jogo.compra_data DESC LIMIT 4";
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesrecent = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRecentesGames = async function() {
    try {
        let sql = "select * from jogo order by jogo.jogo_released DESC limit 5";
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesrecent = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMostDownloadedGames = async function() {
    try {
        let sql = "select * from jogo order by jogo.jogo_downloads DESC limit 5";
        let result = await pool.query(sql);
        let gamesfound = result.rows;
        console.log("[gamesModel.getGamesFromGenre] gamesrecent = " + JSON.stringify(gamesfound));
        return { status: 200, data: gamesfound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

/*
   1. AO FAZER UM ADICIONAR AO FAVORITO, É FEITO UM SELECT DOS JOGOS ADQUIRIDOS PARA VERIFICAR S EO ID DO JOGO E ID DO UTILIZADOR CORRESPONDEM AO PEDIDO FEITO. SE SIM, TEM O JOGO ADQUIRIDO E PODE ADICIONAR 




*/

