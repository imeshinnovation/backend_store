const querys = require('../librerias/querys')

module.exports = {
    listadeusuarios: async () =>{
        return await querys("SELECT * FROM persona")
    },

    unicousuario: async (id) => {
        return await querys("SELECT * FROM persona WHERE id=" + id)
    },
    add: async (body) =>{
        try{
            const{nombre, apellidos, email, password} = body
            const nuevousuario = await querys(`INSERT INTO persona (nombres, apellidos, email, password) VALUES ("${nombres}", "${apellidos}", "${email}", MD5(SHA2("${password}", 256)))`)
            return nuevousuario.affectedRows > 0 ? {'code':1} : {'code': 0}
        } catch (err){
            return {'code': err.text}
        }
    },
    login: async (body) =>{
        try{
            const {email, password} = body
            const prevpass = await querys(`SELECT MD5(SHA2("${password}", 256)) AS PASSWD`)
            const validacion = await querys(`SELECT * FROM persona WHERE email="${email}" AND password="${prevpass[0].PASSWD}"`)
            return validacion.length > 0 ? validacion[0] : {'code': 'crendenciales Incorrectas'}
        }catch (err){
            return {'code': 'Error de MySQL' + err}
        }
    }
}