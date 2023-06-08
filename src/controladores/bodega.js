const querys = require('../librerias/querys')

module.exports = {
  bodega:  async (cantidad) =>{
    return await querys("UPDATE bodega SET WHERE cantidad=" + cantidad)
  },
}

