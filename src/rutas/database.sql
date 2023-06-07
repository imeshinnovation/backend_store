//inserta en auditoria el registro de articulo
DROP TRIGGER IF EXISTS `NuevoProducto`;
DELIMITER &&
CREATE TRIGGER `NuevoProducto`
AFTER INSERT ON `articulo`
FOR EACH ROW
BEGIN
  INSERT INTO `log` (id_evento, evento) VALUES (NEW.id, CONCAT('Se Creo el Producto: ', NEW.nombre));
END&&
DELIMITER ;

//inserta en auditoria el registro de persona
DROP TRIGGER IF EXISTS `NuevoUser`;
DELIMITER &&
CREATE TRIGGER `NuevoUser`
AFTER INSERT ON `persona`
FOR EACH ROW
BEGIN
  INSERT INTO `log` (id_evento, evento) VALUES (NEW.id_user, CONCAT('Se Creo el Usuario: ', NEW.nombres));
END&&
DELIMITER ;

//inserta en auditoria el registro de bodega
DROP TRIGGER IF EXISTS `Actu_inventario`;
DELIMITER &&
CREATE TRIGGER `Actu_inventario`
AFTER UPDATE ON `bodega`
FOR EACH ROW
BEGIN
  INSERT INTO `log` (id_evento, evento) VALUES (NEW.id, CONCAT('Se Actualizo el articulo: ', NEW.id_articulo, ' Cantidad ', NEW.cantidad));
END&&
DELIMITER ;


DROP TRIGGER IF EXISTS `UpdateProduct`;
DELIMITER $$
CREATE TRIGGER `UpdateProduct`
BEFORE UPDATE ON `articulo`
FOR EACH ROW
BEGIN
   INSERT INTO `log` (id_evento, evento) VALUES (OLD.id, CONCAT('Se Actualizo el articulo: ', OLD.nombre));
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS `NuevoBodega`;
DELIMITER !!
CREATE TRIGGER `NuevoBodega`
AFTER INSERT ON `detalle_venta`
FOR EACH ROW
BEGIN
    UPDATE bodega
    SET bodega.cantidad = bodega.cantidad - NEW.cantidadV
    WHERE bodega.id_articulo = NEW.Id_articulo;
    INSERT INTO `log` (id_evento, evento) VALUES (NEW.id, CONCAT('Se vendio el articulo: ', NEW.id_venta,' Cantidad: ',NEW.cantidadV));
END!!
DELIMITER ;
