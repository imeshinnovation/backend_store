const querys = require('../librerias/querys')

module.exports = {
  arttototal:  async () =>{
    return await querys("SELECT * FROM articulo")
  },

  artunitario:  async (id_articulo) =>{
    return await querys(`SELECT * FROM articulo WHERE id_articulo=(${id_articulo})`)
  },

  addarticulo: async (data) =>{
    try{
        const{codigo, nombre, costo, precio_venta} = data
        const newarticulo = await querys(`INSERT INTO articulo (codigo, nombre, costo, precio_venta) VALUES (${codigo}, "${nombre}",  ${costo}, ${precio_venta})`)
        //console.log(newarticulo)
        return newarticulo.affectedRows > 0 ? {'code': 'articulo ingresado'} : {'code': 'Articulo ya se encuentra registrado'}
    } catch (err){
     return {'code': err}
     console.log(this.addarticulo)
    }
  },

  delarticulo: async (data) => {
    try {
      const { id_articulo } = data
      const result = await querys(`DELETE FROM articulo WHERE id_articulo = (${id_articulo})`);
      return result.affectedRows > 0 ? { 'code': 'articulo eliminado con éxito' } : { 'code': 'Artículo no encontrado' };
    } catch (err) {
      console.error(err);
      return { 'code': 'Error al eliminar el artículo' };
    }
  },
  
artupdate: async (data) =>{
  try{
    const{costo, precio_venta, id_articulo } = data
    const algo2 = await querys(`UPDATE articulo SET costo=(${costo}), precio_venta=(${precio_venta}) WHERE id_articulo=(${id_articulo})`)
    console.log(algo2)
    return algo2.affectedRows > 0 ? {'code': 'articulo actualizado'} : {'code': 'no esta funcionando'}
  }catch (err){
    console.log(err)
  return {'code': err}
  }
},
}