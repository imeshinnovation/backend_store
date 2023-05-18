const mariadb = require('mariadb')
require('dotenv').config()
const env = process.env

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
    conexion.query("create table if not exists" + env.DATABASE + ".log(id int(11) primary key not null auto_increment, id_evento int(11) not null, evento varchar(64) not null, create_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".detalle_venta(id_detal_venta int(11) primary key not null auto_increment, Id_articulo int(11) not null, cantidad int(11) not null, precio decimal(11,2) not null, descuento decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".articulo(id_articulo int(11) primary key not null auto_increment, id_categoria int(11) not null, codigo varchar(50) null, nombre varchar(100) not null unique, costo decimal(11,2) not null, precio_venta decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists" + env.DATABASE + ".bodega(id_bodega int(11) primary key not null auto_increment, id_articulo int(11) not null, cantidad int(11) not null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })

    //actuaizaciones registradas en evento de bodega
    conexion.query("DELIMITER $$ CREATE trigger insert_bodega_event AFTER insert on bodega for each row BEGIN SET @dato = new.articulo; insert into log (evento) value(CONCAT('se creo un evento en la tabla bodega: ', @dato)); end $$ ")
    conexion.query("DELIMITER $$ CREATE trigger del_bodega_event AFTER delete on bodega for each row BEGIN SET @dato = old.articulo; insert into log (evento) value(CONCAT('se elimino un articulo en la tabla bodega: ', @dato)); end $$ ")

    //actualizaciones registradas en evento de persona
    conexion.query("DELIMITER $$ CREATE trigger insert_person_event AFTER insert on persona for each row BEGIN SET @dato = new.persona; insert into log (evento) value(CONCAT('se creo un evento en la tabla persona: ', @dato)); end $$ ")
    // conexion.query("DELIMITER $$ CREATE trigger del_person_event AFTER delete on persona for each row BEGIN SET @dato = old.persona; insert into log (evento) value(CONCAT('se elimino un usuario en la tabla persona: ', @dato)); end $$ ")

    //intento de margen de ganancia
    conexion.query("DELIMITER $$ CREATE trigger porcentaje_ganancia BEFORE insert on articulos for each row BEGIN SET @costo_venta = (((NEW.costo * NEW.ganancia) / 100) + NEW.costo) SET NEW.costo_venta = @costovento end $$")

}).catch((error) => {
    console.log('mira, aqui la regaste -> ', error.code)
})

