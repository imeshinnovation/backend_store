const conexion = require('./conexion')

const querys = async (sql) => {
    const conn = await conexion.promesa()
    const resultado = await conn.query(sql, (err, resultado) => {
        if(err) throw err
        return resultado
    })
    conn.end()
    return resultado
}
module.exports = querys