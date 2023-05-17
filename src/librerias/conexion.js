const mariadb = require('mariadb')

const env = process.env

const conexion = mariadb.createPool({
    host: env.DBHOST,
    user: env.DBUSER,
    password: env.DBPASS,
    database: env.DATABASE

})