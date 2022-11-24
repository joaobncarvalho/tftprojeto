var pg = require('pg'); 
 
const connectionString = "postgres://postgres:tftprojeto@localhost:5432/tftdatabasedefinitivo"  //Conectar com os dados normais da BD postgresql
const Pool = pg.Pool 
/*const pool = new Pool({ 
    connectionString, 
    max: 10, 
    ssl: { 
        require: true,  
        rejectUnauthorized: false 
    } 
}) */

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:tftprojeto@localhost:5432/tftdatabasedefinitivo',
    ssl: process.env.DATABASE_URL ? true : false
})
 
module.exports = pool;