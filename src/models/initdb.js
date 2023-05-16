const mariadb = require('mariadb')
require('dotenv').config()
const env = procces.env

mariadb.createConnection({
    host: env.DBHOST,
    user: env.DBUSER,
    password: env.DBPASSWD
}).then((conexion) => {
    console.log('Lograste conectarte a mariadb')
    conexion.query("CREATE DATABASE IF NOT EXIST" + env.DATABASE, (errordb) => {
        if(errordb) throw errordb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".evento(id int(11) primary key not null auto_increment, Id_evento int(11) not null, evento varchar(64) not null, créate_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
})