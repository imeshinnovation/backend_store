DROP TRIGGER IF EXISTS `NuevoPrecioVenta`;
DELIMITER //
CREATE TRIGGER `NuevoPrecioVenta`
BEFORE INSERT ON `Productos`
FOR EACH ROW
BEGIN
    SET @PrecioVenta = (((NEW.Costo * NEW.Margen ) / 100 ) + NEW.Costo);
    SET NEW.Precio_Venta = @PrecioVenta;
END//
DELIMITER ;


DROP TRIGGER IF EXISTS `ACTPrecioVenta`;
DELIMITER //
CREATE TRIGGER `ACTPrecioVenta`
BEFORE UPDATE ON `Productos`
FOR EACH ROW
BEGIN
    SET @PrecioVenta = (((NEW.Costo * OLD.Margen ) / 100 ) + NEW.Costo);
    SET NEW.Precio_Venta = @PrecioVenta;
END//
DELIMITER ;


DROP TRIGGER IF EXISTS `NuevoPrecioVentaAfter`;
DELIMITER &&
CREATE TRIGGER `NuevoPrecioVentaAfter`
AFTER INSERT ON `articulo`
FOR EACH ROW
BEGIN

  INSERT INTO `log` (id_evento, Evento) VALUES (NEW.id, CONCAT('Se Creo el Producto: ', NEW.nombre));
END&&
DELIMITER ;

DROP TRIGGER IF EXISTS `NuevoUser`;
DELIMITER &&
CREATE TRIGGER `NuevoUser`
AFTER INSERT ON `persona`
FOR EACH ROW
BEGIN

  INSERT INTO `log` (id_evento, Evento) VALUES (NEW.id_user, CONCAT('Se Creo el Usuario: ', NEW.nombres));
END&&
DELIMITER ;


DROP TRIGGER IF EXISTS `Actu_inventario`;
DELIMITER &&
CREATE TRIGGER `Actu_inventario`
AFTER UPDATE ON `Inventario`
FOR EACH ROW
BEGIN

  INSERT INTO `Auditoria` (id_evento, Evento) VALUES (NEW.id, CONCAT('Se Actualizo el Producto: ', NEW.id_producto, ' Cantidad ', NEW.Cantidad));
END&&
DELIMITER ;

DROP TRIGGER IF EXISTS `UpdatePrecioVenta`;
DELIMITER $$
CREATE TRIGGER `UpdatePrecioVenta`
BEFORE UPDATE ON `Productos`
FOR EACH ROW
BEGIN
   
   INSERT INTO `Auditoria` (id_evento, Evento) VALUES (OLD.id, CONCAT('Se Actualizo el Producto: ', OLD.Nombre_Producto));
END$$
DELIMITER ;


DROP TRIGGER IF EXISTS `NuevoInventario`;
DELIMITER !!
CREATE TRIGGER `NuevoInventario`
AFTER INSERT ON `Ventas`
FOR EACH ROW
BEGIN
    UPDATE Inventario
    SET Inventario.Cantidad = Inventario.Cantidad - NEW.Cantidad1
    WHERE Inventario.id_producto = NEW.id_prod;
    INSERT INTO `Auditoria` (id_evento, Evento) VALUES (NEW.id, CONCAT('Se vendio el Producto: ', NEW.id_prod,' Cantidad: ',NEW.Cantidad1));
END!!
DELIMITER ;