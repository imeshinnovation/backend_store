const enlace = require('./conexion')

const querys = async (sql) => {
    const conn = await enlace.promesa()
    const resultado = await conn.query(sql, (err, resultado) => {
        if(err) console.log(err)
        return resultado
    })
    conn.end()
    return resultado
}
module.exports = querys