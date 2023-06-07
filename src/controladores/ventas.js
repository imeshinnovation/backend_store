const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
  ventatotal:  async () =>{
    return await querys("SELECT * FROM detalle_venta")

    const{tipo_persona, nombres, apellidos, tipo_documento, num_documento, direccion, telefono, email, password} = data
    // await sendEmail(email, 'Su Cuenta Infinity', `Hola ${nombres} ${apellidos}, le damos la bienvenida a Infinity, su tienda Online, le invitamos a conocer nuestros productos y formar parte de nuestra comunidad.`)
    
  },

  ventaunitaria:  async (detalle_venta) => {
    try{
      const{Id_articulo, cantidad, precio, descuento} = detalle_venta
      const detailventa = await querys(`INSERT INTO articulo (Id_articulo, cantidad, precio, descuento ) VALUES (${Id_articulo}, ${cantidad}, ${precio}, ${descuento})`)
      console.log(detailventa)
      return detailventa.affectedRows > 0 ? {'code': 'venta OK'} : {'code': 'No se completo la venta'}
  } catch (err){
   return {'code': err.text}
  }
  },

  

}