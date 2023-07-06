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
    conexion.query("create table if not exists " + env.DATABASE + ".articulo(id_articulo int(11) primary key not null auto_increment, codigo int(11) not null, nombre varchar(100) not null unique, costo decimal(11,2) not null, precio_venta decimal(11,2) not null) ENGINE=InnoDB", (errordtb) => {
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists " + env.DATABASE + ".detalle_venta(id_detal_venta int(11) primary key not null auto_increment, id_user int(11) not null, id_articulo int(11) not null, cantidad1 int(11) not null, precio int(11) not null, descuento decimal(11,2) null, estado_venta BIT default(0)) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    conexion.query("create table if not exists " + env.DATABASE + ".bodega(id_bodega int(11) primary key not null auto_increment, id_articulo int(11) not null, cantidad int(11) null) ENGINE=InnoDB", (errordtb) => {        
        if(errordtb) throw errordtb
    })
    
    conexion.query(`
    CREATE TRIGGER IF NOT EXISTS ${env.DATABASE}.NuevoProducto
    AFTER INSERT ON ${env.DATABASE}.articulo
    FOR EACH ROW
    BEGIN
      INSERT INTO ${env.DATABASE}.log (id_evento, evento) VALUES (NEW.id_articulo, CONCAT('Se Creo el Producto: ', NEW.nombre));
    END;`, (errortri) => {
        if(errortri) throw errortri
    })

}).catch((error) => {
    console.log('mira, aqui la regaste -> ', error)
})

