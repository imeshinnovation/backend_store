const { query } = require('express')
const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
  ventatotal:  async (id_user) =>{
    try {
      const detalle_venta = await querys(`SELECT * FROM detalle_venta WHERE id_user=${id_user}`)
      const datos_usuario = await querys(`SELECT * FROM persona WHERE id_user=${id_user}` )
      const articulo = await querys(`SELECT * FROM articulo WHERE id_articulo=${detalle_venta[0].id_articulo}`)
      console.log(`${articulo}`)

      //await sendEmail(`${datos_usuario[0].email}`, 'prueba', `Hola ${datos_usuario[0].nombres}, compraste ${articulo} `)

    } catch (err) {
      return {'code' : err}
    }
    
    
  },

  ventaunitaria:  async (data) => {
    try{
      const{id_user, id_articulo, cantidad1, precio, descuento} = data
      const detailventa = await querys(`INSERT INTO detalle_venta (id_user, id_articulo, cantidad1, precio, descuento ) VALUES (${id_user}, ${id_articulo}, ${cantidad1}, ${precio}, ${descuento})`)
      console.log(detailventa)
      return detailventa.affectedRows > 0 ? {'code': 'venta OK'} : {'code': 'No se completo la venta'}
  } catch (err){
   return {'code': err}
  }
  },

}