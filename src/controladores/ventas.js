const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
  ventatotal:  async () =>{
    try {
      const comprador = await querys ('SELECT * FROM detalle_venta')
      
      //const {nombres, apellidos, id_articulo} = data
      //await sendEmail('willian.15102017@gmail.com', 'prueba', `Hola ${nombres} ${apellidos}, compraste `)
      console.log(comprador)
      return comprador

      //return await querys("SELECT * FROM detalle_venta")
    } catch (err) {
      return {'code' : err}
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