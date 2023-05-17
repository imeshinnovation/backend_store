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
    conexion.query("CREATE TABLE IF NOT EXISTS " + env.DATABASE + ".persona (id INT(11) PRIMARY KEY AUTO_INCREMENT, tipo_persona varchar(20) not null, nombres VARCHAR(64) not null, apellidos VARCHAR(64) not null, tipo_documento varchar(20) not null, num_documento varchar(20) not null, direccion varchar(70) not null, telefono varchar(20) not null, email VARCHAR(128) not null UNIQUE, password VARCHAR(128) not null ) ENGINE=InnoDB ", (errordtb) => {
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".evento(id int(11) primary key not null auto_increment, Id_evento int(11) not null, evento varchar(64) not null, créate_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".detalle_venta(id_detal_venta int(11) primary key not null auto_increment, Id_articulo int(11) not null, cantidad int(11) not null, precio decimal(11,2) not null, descuento decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".articulo(id_articulo int(11) primary key not null auto_increment, id_categoria int(11) not null, codigo varchar(50) null, nombre varchar(100) not null unique, costo decimal(11,2) not null, precio_venta decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
}).catch((error) => {
    console.log('mira, aqui la regaste -> ', error.code)
})