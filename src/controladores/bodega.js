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

  bodega: async (cantidad, id_articulo) =>{
    return await querys("UPDATE bodega SET cantidad=" + cantidad, "WHERE id=" + id_articulo )
  },
}

