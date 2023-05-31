const Rutas = require('express').Router()

const usuarios = require('../controladores/personas')
const ventas = require('../controladores/ventas')

//ventas.js
Rutas.get('/ventat', async (req, res) => {
    res.json(await ventas.ventatotal())
})

Rutas.get('/ventau', async (req, res) => {
    res.json(await ventas.ventaunitaria)
})



// personas.js
Rutas.post('/agregar', async (req, res) => {
    res.json(await usuarios.agregar(req.body))
})



Rutas.post('/login', async (req,res) => {
    res.json(await usuarios.login(req.body))
})

// read a unique user
Rutas.get('/usuarios/:id?', async (req, res) => {
    res.json(await usuarios.unicousuario(req.params.id))
})

module.exports = Rutas