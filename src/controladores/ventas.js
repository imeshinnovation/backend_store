const querys = require('../librerias/querys')

module.exports = {
  ventatotal:  async () =>{
    return await querys("SELECT * FROM detalle_venta")
  },

  ventaunitaria:  async () =>{
    return await querys("SELECT * FROM detalle_venta WHERE id_detal_venta=" + id_detal_venta)
  },

}