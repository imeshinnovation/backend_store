const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
  ventatotal:  async () =>{
    return await querys("SELECT * FROM detalle_venta")

    const{tipo_persona, nombres, apellidos, tipo_documento, num_documento, direccion, telefono, email, password} = data
    // await sendEmail(email, 'Su Cuenta Infinity', `Hola ${nombres} ${apellidos}, le damos la bienvenida a Infinity, su tienda Online, le invitamos a conocer nuestros productos y formar parte de nuestra comunidad.`)
    
  },

  ventaunitaria:  async (id_detal_venta) =>{
    return await querys("SELECT * FROM detalle_venta WHERE id_detal_venta=" + id_detal_venta)
  },

  

}