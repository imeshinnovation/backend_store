const querys = require('../librerias/querys')

module.exports = {

  bogtotal:  async () =>{
    return await querys("SELECT * FROM bodega")
  },

  bogunitario:  async (id_articulo) =>{
    return await querys("SELECT * FROM articulo WHERE id_articulo=" + id_articulo)
  },

  addbodega: async (data) =>{
    try{
        const{id_articulo, cantidad} = data
        const bodega = await querys(`INSERT INTO bodega (id_articulo, cantidad) VALUES (${id_articulo}, ${cantidad})`)
        console.log(bodega)
        return bodega.affectedRows > 0 ? {'code': 'articulo almacenado'} : {'code': 0}
    }catch (err){
     return {'code': err}
    }
  },

  bogupdate: async (data) =>{
    //return await querys(`UPDATE bodega SET cantidad=(${cantidad}) , WHERE id_articulo=(${id_articulo})`)
    try{
      const{cantidad, id_articulo } = data
      const algo = await querys(`UPDATE bodega SET cantidad=(${cantidad}) WHERE id_articulo=(${id_articulo})`)
      console.log(algo)
      return algo.affectedRows > 0 ? {'code': 'articulo actualizado'} : {'code': 'papi revisa tu codigo, eso no funciona asi'}
    }catch (err){
    return {'code': err}
    }
  },
}

