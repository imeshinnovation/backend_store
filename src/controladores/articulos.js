const querys = require('../librerias/querys')

module.exports = {
  arttototal:  async () =>{
    return await querys("SELECT * FROM articulo")
  },

  artunitario:  async (id_articulo) =>{
    return await querys("SELECT * FROM articulo WHERE id_articulo=" + id_articulo)
  },

  addarticulo: async (data) =>{
    //try{
        const{id_categoria, nombre, costo, precio_venta} = data
        const newarticulo = await querys(`INSERT INTO articulo (id_categoria, nombre, costo, precio_venta) VALUES ("${id_categoria}","${nombre}", "${costo}", "${precio_venta}"`)
        console.log(newarticulo)
        return newarticulo.affectedRows > 0 ? {'code': 'articulo ingresado'} : {'code': 'Articulo ya se encuentra registrado'}
    //} catch (err){
    //  console.log(err.text)  
    //  return {'code': err}
    //}
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