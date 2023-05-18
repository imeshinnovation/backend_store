const querys = require('../librerias/querys')

module.exports = {
  arttototal:  async () =>{
    return await querys("SELECT * FROM articulos")
  },

  artunitario:  async () =>{
    return await querys("SELECT * FROM articulos WHERE id_articulo=" + id_articulo)
  },

  addarticulo: async (data) =>{
    try{
        const{nombre, costo, precio_venta} = data
        const newarticulo = await querys(`INSERT INTO articulo (nombre, costo, precio_venta) VALUES ("${nombre}", "${costo}", "${precio_venta}"`)
        return newarticulo.affectedRows > 0 ? {'code': 'articulo ingresado'} : {'code': 'Articulo ya se encuentra registrado'}
    } catch (err){
        return {'code': err.text}
    }
},
  delarticulo: async (data) =>{
  try{
      const{nombre, costo, precio_venta} = data
      const oldarticulo = await querys(`DELETE FROM articulo (nombre, costo, precio_venta) VALUES ("${nombre}", "${costo}", "${precio_venta}"`)
      return oldarticulo.affectedRows > 0 ? {'code': 'articulo elimado con exito'} : {'code': 'Articulo no encontrado'}
  } catch (err){
      return {'code': err.text}
  }
},
}