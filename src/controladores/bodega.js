const querys = require('../librerias/querys')

module.exports = {
  bodega:  async (cantidad, id_articulo) =>{
    return await querys("UPDATE bodega SET cantidad=" + cantidad, "WHERE id=" + id_articulo )
  },
  inventario:  async () =>{
    return await querys("SELECT * FROM bodega")
  },
}

