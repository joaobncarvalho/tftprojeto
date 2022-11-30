------------------------------------------------ ENCRIPTAÇÃO E DESENCRIPTAÇÃO DE PASSWORDS -----------------------------------------------------

	------------- ENCRIPTAÇÃO ------------------------
		
INSERT INTO utilizador (utilizador_name, utilizador_password, utilizador_email, utilizador_dinheiro, utilizador_pass)
VALUES ('beatricedoe', 'beatricedoepassword', 'beatricedoe@gmail.com', 500, PGP_SYM_ENCRYPT('beatricedoepassword', 'key')::text)
		
		------------- DESENCRIPTAÇÃO ---------------------
SELECT utilizador.utilizador_name, PGP_SYM_DECRYPT(utilizador.utilizador_pass::bytea, 'key') FROM utilizador WHERE utilizador.utilizador_id = 10;
		
		----------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE utilizador (

   utilizador_id SERIAL primary key,
   utilizador_name varchar(40) NOT NULL,
   utilizador_password varchar(40) NOT NULL,
   utilizador_email varchar(80),
   utilizador_dinheiro real NOT NULL

);

CREATE TABLE plataforma (

   plataforma_id SERIAL primary key,
   plataforma_name varchar(60) NOT NULL

);


CREATE TABLE plataforma_follow (

   plataforma_id_follow SERIAL primary key,
   plataforma_user_id int,
   plataforma_identifier int

);

ALTER TABLE plataforma_follow
ADD CONSTRAINT fk_plataforma_user_id FOREIGN KEY(plataforma_user_id) REFERENCES utilizador (utilizador_id);

ALTER TABLE plataforma_follow
ADD CONSTRAINT fk_plataforma_identifier FOREIGN KEY(plataforma_identifier) REFERENCES plataforma (plataforma_id);

CREATE TABLE plataforma_jogo (

   plataforma_jogo_id SERIAL primary key,
   plataforma_identifier int,
   jogo_identifier int

);

ALTER TABLE plataforma_jogo
ADD CONSTRAINT fk_plataforma_identifier FOREIGN KEY(plataforma_identifier) REFERENCES plataforma (plataforma_id);

ALTER TABLE plataforma_jogo
ADD CONSTRAINT fk_jogo_identifier FOREIGN KEY(jogo_identifier) REFERENCES jogo (jogo_id);

CREATE TABLE jogo (

   jogo_id SERIAL primary key,
   jogo_name varchar(120) NOT NULL,
   jogo_released date NOT NULL,
   jogo_rating real,
   jogo_preco real NOT NULL,
   jogo_downloads int,
   jogo_desc varchar(6000)
   
);

ALTER TABLE 

ALTER TABLE jogo
ADD COLUMN jogo_link varchar(400)

CREATE TABLE utilizador_jogo (

   id_compra SERIAL primary key,
   id_utilizador int NOT NULL,
   id_jogo int NOT NULL,
   compra_data date NOT NULL

);

ALTER TABLE utilizador_jogo
ADD CONSTRAINT fk_id_jogo FOREIGN KEY(id_jogo) REFERENCES jogo (jogo_id);

CREATE TABLE wishlist (

   wishlist_id SERIAL primary key,
   wishlist_user_id int,
   wishlist_jogo_id int

);

ALTER TABLE wishlist
ADD CONSTRAINT fk_wishlist_user_id FOREIGN KEY(wishlist_user_id) REFERENCES utilizador (utilizador_id);

ALTER TABLE wishlist
ADD CONSTRAINT fk_wishlist_jogo_id FOREIGN KEY(wishlist_jogo_id) REFERENCES jogo (jogo_id);

CREATE TABLE favorito (

   favorite_id SERIAL primary key,
   favorite_user_id int,
   favorite_jogo_id int

);

ALTER TABLE favorito
ADD CONSTRAINT fk_favorite_user_id FOREIGN KEY(favorite_user_id) REFERENCES utilizador (utilizador_id);

ALTER TABLE favorito
ADD CONSTRAINT fk_favorite_jogo_id FOREIGN KEY(favorite_jogo_id) REFERENCES jogo (jogo_id);

CREATE TABLE genero (

    id_genero SERIAL primary key,
	name_genero varchar(120)

);

CREATE TABLE jogo_genero (

	jogo_genero_id SERIAL primary key,
	game_id int,
	genre_id int

);

ALTER TABLE jogo_genero
ADD CONSTRAINT fk_game_id FOREIGN KEY(game_id) REFERENCES jogo (jogo_id);

ALTER TABLE jogo_genero
ADD CONSTRAINT fk_genre_id FOREIGN KEY(genre_id) REFERENCES genero (id_genero);

CREATE TABLE requisito (

    requisito_id SERIAL primary key,
	req_sistema_operativo varchar(120) NOT NULL,
	req_processador varchar(120) NOT NULL,
	req_memoria varchar(120) NOT NULL,
	req_graficos varchar(120) NOT NULL,
	req_esp_armazenamento varchar(120) NOT NULL,
	req_jogo_id int

);

ALTER TABLE requisito
ADD CONSTRAINT fk_req_jogo_id FOREIGN KEY(req_jogo_id) REFERENCES jogo (jogo_id);


CREATE TABLE achievement (

    achievement_id SERIAL primary key,
	achievement_name varchar(120) NOT NULL,
	achievement_desc varchar(7000) NOT NULL,
	jogo_identifier int

);

ALTER TABLE achievement
ADD CONSTRAINT fk_jogo_identifier FOREIGN KEY(jogo_identifier) REFERENCES jogo (jogo_id);

CREATE TABLE achievement_utilizador (

    achievement_utilizador_id SERIAL primary key,
	utilizador_identifier_id int,
	achievement_identifier_id int

);

DROP TABLE achievement_utilizador

ALTER TABLE achievement_utilizador
ADD CONSTRAINT fk_achievement_identifier_id FOREIGN KEY (achievement_identifier_id) REFERENCES achievement (achievement_id);


ALTER TABLE achievement_utilizador
ADD CONSTRAINT fk_utilizador_identifier_id FOREIGN KEY (utilizador_identifier_id) REFERENCES utilizador (utilizador_id);

DELETE TABLE achievement_utilizador

CREATE TABLE loja (

	loja_id SERIAL primary key,
	loja_nome varchar(120),
	loja_url varchar(400)

);

CREATE TABLE jogo_loja (

	jogo_loja_id SERIAL primary key,
	loja_identifier int,
	jogo_identifier int

);

ALTER TABLE jogo_loja
ADD CONSTRAINT fk_loja_identifier FOREIGN KEY (loja_identifier) REFERENCES loja (loja_id);

ALTER TABLE jogo_loja
ADD CONSTRAINT fk_jogo_identifier FOREIGN KEY (jogo_identifier) REFERENCES jogo (jogo_id);

-- 

-- INSERTS NA BD

INSERT INTO 
loja (loja_nome, loja_url) 
VALUES
('XBox Live', 'https://www.xbox.com/en-US/live'),
('Nintendo EShop', 'https://www.nintendo.com/'),
('Microsoft Store', 'https://apps.microsoft.com/'),
('Steam', 'https://store.steampowered.com/'),
('Origin', 'https://www.origin.com/irl/en-us/store'),
('GameStop', 'https://www.gamestop.com/'),
('Epic Games', 'https://store.epicgames.com/en-US/'),
('Game Jolt', 'https://gamejolt.com/')

--INSERTS POR FAZER
--1. INSERT DE GENEROS DE JOGOS

INSERT INTO 
genero (name_genero) 
VALUES
('Ação'),
('Indie'),
('Aventura'),
('RPG'),
('Estratégia'),
('Tiro'),
('Casual'),
('Simulador')
('Puzzle')
('Arcade')
('Plataforma')
('Corrida')
('MMO')
('Desporto')
('Luta')
('Familiar')
('Tabuleiro')
('Educacionais')
('Cartas')

--2. INSERT DE PLATAFORMAS

INSERT INTO
plataforma(plataforma_name)
VALUES
('PC'),
('PlayStation 5'),
('Xbox One'),
('PlayStation 4'),
('XBox Series S/X'),
('Nintendo-Switch'),
('iOS'),
('Android'),
('Nintendo 3DS'),
('Nintendo DS'),
('Nintendo DSi'),
('macOS'),
('Linux'),
('XBox 360'),
('XBox'),
('PlayStation 3'),
('PlayStation 2'),
('PlayStation 1'),
('PS Vita'),
('PSP'),
('Wii U'),
('Wii')

--3. INSERT DE JOGOS

INSERT INTO 
jogo (jogo_name, jogo_released, jogo_rating, jogo_preco, jogo_downloads, jogo_desc, jogo_link)
VALUES
('Grand Theft Auto V', 2013-09-17, 91, 35.95, 0, "<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>", "https://www.rockstargames.com/gta-v"),
('The Witcher 3: Wild Hunt', 2015-05-18, 92, 57.46, 0, "<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p>\n<p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p>\n<p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>", "https://www.thewitcher.com/en/witcher3"),
('')

---------------------------------- NEW CODE (4/10/2022)

SELECT * FROM favorito WHERE favorito.favorite_user_id = x AND favorito.favorite_jogo_id = y 

SELECT * FROM favorito

INSERT INTO favorito (favorite_user_id, favorite_jogo_id)
VALUES (1, 5)

SELECT * FROM jogo

SELECT * FROM jogo_genero

SELECT * FROM genero

SELECT * FROM utilizador_jogo

SELECT favorito.favorite_user_id, favorito.favorite_jogo_id, utilizador.utilizador_id, utilizador.utilizador_name, jogo.jogo_name, jogo.jogo_rating, jogo.jogo_downloads, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero FROM favorito INNER JOIN utilizador ON utilizador.utilizador_id = favorito.favorite_user_id INNER JOIN jogo ON jogo.jogo_id = favorito.favorite_jogo_id INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id WHERE utilizador.utilizador_id = x

-----------------------------------------------------------------------------------------------------------------

SELECT jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_preco, jogo.jogo_downloads, jogo.jogo_desc, jogo.jogo_link, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero, requisito.requisito_id, requisito.req_minimo, requisito.req_recomendado, requisito.req_jogo_id, jogo_loja.jogo_loja_id, jogo_loja.loja_identifier, jogo_loja.jogo_identifier, loja.loja_nome, loja.loja_domain, plataforma_jogo.plataforma_jogo_id, plataforma_jogo.plataforma_identifier, plataforma_jogo.jogo_identifier, plataforma.plataforma_id, plataforma_name
FROM jogo 
INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id 
INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id 
INNER JOIN jogo_loja ON jogo_loja.jogo_identifier = jogo.jogo_id 
INNER JOIN loja ON loja.loja_id = jogo_loja.loja_identifier
INNER JOIN plataforma_jogo ON plataforma_jogo.jogo_identifier = jogo.jogo_id
INNER JOIN plataforma ON plataforma.plataforma_id = plataforma_jogo.plataforma_identifier
INNER JOIN requisito ON requisito.req_jogo_id = jogo.jogo_id 
WHERE jogo.jogo_id = x


SELECT utilizador.utilizador_name, utilizador.utilizador_email, utilizador.utilizador_dinheiro FROM utilizador WHERE utilizador.utilizador_id = x

SELECT jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_preco, jogo.jogo_downloads, jogo.jogo_desc, jogo.jogo_link, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero, requisito.requisito_id, requisito.req_minimo, requisito.req_recomendado, requisito.req_jogo_id
FROM JOGO
INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id
INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id
INNER JOIN requisito ON requisito.req_jogo_id = jogo.jogo_id

SELECT jogo.jogo_id, jogo.jogo_name, jogo.jogo_released, jogo.jogo_preco, jogo.jogo_downloads, jogo.jogo_desc, jogo.jogo_link, jogo_genero.jogo_genero_id, jogo_genero.game_id, jogo_genero.genre_id, genero.id_genero, genero.name_genero
FROM JOGO
INNER JOIN jogo_genero ON jogo_genero.game_id = jogo.jogo_id
INNER JOIN genero ON genero.id_genero = jogo_genero.genre_id
WHERE jogo.jogo_id = 1

INSERT INTO requisito (req_minimo, req_recomendado, req_jogo_id)
VALUES ('Requisitos Minimos do jogo de Teste Game 1', 'Requisitos Recomendados do jogo de Teste Game 1', 1)

INSERT INTO jogo_loja (loja_identifier, jogo_identifier)
VALUES (1, 1)

SELECT * FROM plataforma

SELECT * FROM plataforma_jogo

SELECT * FROM loja

INSERT INTO loja (loja_nome, loja_domain)
VALUES ('Test Store', 'www.teststore.com')


--CADA JOGO TERÁ UM LINK ASSOCIADO. ESSE LINK LEVARÁ A UMA PAGINA A SIMULAR O JOGO. A PARTIR DAÍ É CONTADO O NUMERO DE PESSOAS NESSE JOGO NUM DETERMINADO MOMENTO (LINK).

-- O NUMERO DE JOGOS DE CADA PLATAFORMA SURGE POR UM COUNT DA TABELA plataforma_jogo, SEGUINDO UM DETERMINADO ID DA PLATAFORMA.


