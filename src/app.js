const express = require('express')
const morgan = require('morgan')

require('dotenv').config()

const env = process.env

require('./models/arranquedb')

const app1 = express()	

app1.use(morgan('dev'))


app1.use(express.json())	

app1.use('/api/users', require('./rutas/users'))

app1.listen(env.PORT, env.IP, () => {
    console.log('Servidor escuchando en http://' + env.IP + ':' + env.PORT)
}) 