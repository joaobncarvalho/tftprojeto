/*const express = require('express')
const app = express()
app.get('/users', (req, res) => res.send('Ola Mundo!'))

//app.listen(8080, () => console.log('Node.js app listening on port 8080.'))

app.listen(3000, () => console.log('Node.js app listening on port 3000.'))
*/
/*
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));*/

const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const Nexmo = require('nexmo')
const app = express()

//NEW CODE TO COUNT USERS
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const http2 = require('http').createServer(app);
const io2 = require('socket.io')(http2)

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
nunjucks.configure('views', {express: app})

//Conexão e desconexão de utilizadores | Vai ser ligada a uma pagina WEB

io2.on('connection', function(socket2) {

   console.log("A user connected to this page");

   socket2.on('disconnect', function() {

      console.log("A user disconnected");

   })


})

io.on('connection', function(socket) {

   console.log("A user connected");

   socket.on('disconnect', function(){

     console.log("A user disconnected");

   })
})


const nexmo = new Nexmo({

   apiKey: 'abce5639',
   apiSecret: 'L5FRitSR5lH6RGpP'

})

///////////OTHER CODE//////////

const cors = require('cors');
const { isFloat32Array } = require('util/types')

const corsOptions = {
   origin: 'http://localhost:5000',
   credentials: true,
   optionSucessStatus: 200
}
const port = 5000


//app.get('/', (req, res) => res.send('Server is Upp!'))



//Acesso ás webpages



app.get("/", function(req, res) {

   res.sendFile(__dirname+"/public/index.html")
   
})





app.use(cors(corsOptions));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

