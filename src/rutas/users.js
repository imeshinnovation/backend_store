const Rutas = require('express').Router()

const usuarios = require('../controladores/personas')
const ventas = require('../controladores/ventas')
const articulos = require('../controladores/articulos')

//articulos.js
Rutas.get('/artt', async (req, res) => {
    res.json(await articulos.arttototal(req.params.arttototal))
})
Rutas.get('/artu', async (req, res) => {
    res.json(await articulos.artunitario(req.params.artunitario))
})  

Rutas.post('/artadd', async (req, res) => {
    res.json(await articulos.addarticulo(req.body))
})


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
    res.json(await usuarios.agregar(req.body))
})

// read a unique user
Rutas.get('/usuarios/:id?', async (req, res) => {
    res.json(await usuarios.unicousuario(req.params.id))
})

module.exports = Rutas