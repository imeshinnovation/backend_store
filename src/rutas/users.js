const Rutas = require('express').Router()

const usuarios = require('../controladores/articulos')

//read
Rutas.get('/usuarios', async (req, res) => {
    res.json(await usuarios.listadeusuarios())
})

// read a unique user
Rutas.get('/usuarios/:id?', async (req, res) => {
    res.json(await usuarios.unicousuario(req.params.id))
})

// crear USUARIOS
Rutas.post('/agregar', async (req, res) => {
    res.json(await usuarios.add(req.body))
})

Rutas.post('/login', async (req,res) => {
    res.json(await usuarios.login(req.body))
})

module.exports = Rutas