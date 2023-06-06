const mariadb = require('mariadb')
require('dotenv').config()
const env = process.env

mariadb.createConnection({
    host: env.DBHOST,
    user: env.DBUSER,
    password: env.DBPASSWD
}).then((conexion) => {
    console.log('Lograste conectarte a mariadb')
    conexion.query("CREATE DATABASE IF NOT EXISTS " + env.DATABASE, (errordb) => {
        if(errordb) throw errordb
    })
    conexion.query("CREATE TABLE IF NOT EXISTS " + env.DATABASE + ".persona (id_user INT(11) PRIMARY KEY AUTO_INCREMENT, tipo_persona varchar(20) not null, nombres VARCHAR(64) not null, apellidos VARCHAR(64) not null, tipo_documento varchar(20) not null, num_documento varchar(20) not null, direccion varchar(70) not null, telefono varchar(20) not null, email VARCHAR(128) not null UNIQUE, password VARCHAR(128) not null ) ENGINE=InnoDB ", (errordtb) => {
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists " + env.DATABASE + ".log(id int(11) primary key not null auto_increment, id_evento int(11) not null, evento varchar(64) not null, create_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB", (error) => {        
        if(error) throw error
    })
    conexion.query("create table if not exists " + env.DATABASE + ".articulo(id int(11) primary key not null auto_increment, codigo varchar(50) not null, nombre varchar(100) not null unique, costo decimal(11,2) not null, precio_venta decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists " + env.DATABASE + ".detalle_venta(id_detal_venta int(11) primary key not null auto_increment, Id_articulo int(11) not null, cantidad int(11) not null, precio decimal(11,2) not null, descuento decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists " + env.DATABASE + ".bodega(id_bodega int(11) primary key not null auto_increment, id_articulo int(11) not null, cantidad int(11) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
}).catch((error) => {
    console.log('mira, aqui la regaste -> ', error)
})

