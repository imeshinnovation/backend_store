const querys = require('../librerias/querys')

module.exports = {
    usuariostotal: async () =>{
        return await querys("SELECT * FROM persona")
    },

    onlyuser: async (id) => {
        return await querys("SELECT * FROM persona WHERE id=" + id)
    },
    agregar: async (data) =>{
        try{
            const{nombres, apellidos, email, password} = data
            const newuser = await querys(`INSERT INTO persona (nombres, apellidos, email, password) VALUES ("${nombres}", "${apellidos}", "${email}", MD5(SHA2("${password}", 256)))`)
            return newuser.affectedRows > 0 ? {'code': 'Usuario registrado con exito'} : {'code': 'Usuario ya esta registrado'}
        } catch (err){
            return {'code': err.text}
        }
    },
    login: async (data) =>{
        try{
            const {email, password} = data
            const prevpass = await querys(`SELECT MD5(SHA2("${password}", 256)) AS PASSWD`)
            const validacion = await querys(`SELECT * FROM persona WHERE email="${email}" AND password="${prevpass[0].PASSWD}"`)
            return validacion.length > 0 ? validacion[0] : {'code': 'crendenciales Incorrectas'}
        }catch (err){
            return {'code': 'Error de MySQL' + err}
        }
    }
}