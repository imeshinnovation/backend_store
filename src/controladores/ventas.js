const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
  ventatotal:  async () =>{
    try {
      
      const{nombres, apellidos, id_articulo} = data
      await sendEmail(`Hola ${nombres} ${apellidos}, compraste ${id_articulo}`)

      return await querys("SELECT * FROM detalle_venta")
    } catch {

    }
    
    
  },

  ventaunitaria:  async (data) => {
    try{
      const{id_articulo, cantidad1, precio, descuento} = data
      const detailventa = await querys(`INSERT INTO detalle_venta (id_articulo, cantidad1, precio, descuento ) VALUES (${id_articulo}, ${cantidad1}, ${precio}, ${descuento})`)
      console.log(detailventa)
      return detailventa.affectedRows > 0 ? {'code': 'venta OK'} : {'code': 'No se completo la venta'}
  } catch (err){
   return {'code': err}
  }
  },

}