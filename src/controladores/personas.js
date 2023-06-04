const querys = require('../librerias/querys')
const sendEmail = require('../librerias/sendmail')

module.exports = {
    usuariostotal: async () =>{
        return await querys("SELECT * FROM persona")
    },

    onlyuser: async (id) => {
        return await querys("SELECT * FROM persona WHERE id=" + id)
    },
    agregar: async (data) =>{
        //try{
            const{tipo_persona, nombres, apellidos, tipo_documento, num_documento, direccion, telefono, email, password} = data
            const newuser = await querys(`INSERT INTO persona (tipo_persona, nombres, apellidos, tipo_documento, num_documento, direccion, telefono, email, password) VALUES ("${tipo_persona}","${nombres}", "${apellidos}", "${tipo_documento}", "${num_documento}", "${direccion}", "${telefono}", "${email}", MD5(SHA2("${password}", 256)))`)

            console.log(newuser)

            await sendEmail(email, 'Su Cuenta Infinity', `Hola ${nombres} ${apellidos}, le damos la bienvenida a Infinity, su tienda Online, le invitamos a conocer nuestros productos y formar parte de nuestra comunidad.`)

            return newuser.affectedRows > 0 ? {'code': 'Usuario registrado con exito'} : {'code': 'Usuario ya esta registrado'}
        //} catch (err){
        //    return {'code': err.text}
        //}
    },
    login: async (data) =>{
        try{
            const {email, password} = data
            const prevpass = await querys(`SELECT MD5(SHA2("${password}", 256)) AS PASSWD`)
            const validacion = await querys(`SELECT * FROM persona WHERE email="${email}" AND password="${prevpass[0].PASSWD}"`)
            return validacion.length > 0 ? validacion[0] : {'si eres we' : 'crendenciales Incorrectas'}
        }catch (err){
            return {'code': 'Error de MySQL' + err}
        }
    }
}