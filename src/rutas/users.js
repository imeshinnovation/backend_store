const Rutas = require('express').Router()
const usuarios = require('../controladores/personas')
const ventas = require('../controladores/ventas')
const articulos = require('../controladores/articulos')
const bodega = require('../controladores/bodega')

//articulos.js
Rutas.get('/artt', async (req, res) => {
    res.json(await articulos.arttototal())
})
Rutas.get('/artu/:id?', async (req, res) => {
    res.json(await articulos.artunitario(req.params.id))
})  

Rutas.post('/artadd', async (req, res) => {
    res.json(await articulos.addarticulo(req.body))
})
Rutas.delete('/artdel', async (req, res) => {
    res.json(await articulos.delarticulo(req.body))
})

//ventas.js
Rutas.get('/ventat', async (req, res) => {
    res.json(await ventas.ventatotal())
})
Rutas.post('/ventau', async (req, res) => {
    res.json(await ventas.ventaunitaria(req.body))
})


// personas.js
Rutas.get('/useruni', async (req, res) => {
    res.json(await usuarios.usuariostotal(req.params.usuariostotal))
})
Rutas.get('/onlyuser/:id?', async (req, res) => {
    res.json(await usuarios.onlyuser(req.params.id))
})

Rutas.post('/agregar', async (req, res) => {
    res.json(await usuarios.agregar(req.body))
})
Rutas.post('/login', async (req, res) => {
    res.json(await usuarios.login(req.body))
})

// Bodega
Rutas.put('/bodega', async (req, res) =>{
    res.json(await usuarios.bodega(req.body))
})

Rutas.get('/bodega_art', async (req, res) => {
    res.json(await bodega.inventario(req.params.inventario))
})


// read a unique user
//Rutas.get('/usuarios/:id?', async (req, res) => {
//    res.json(await usuarios.unicousuario(req.params.id))
//})

module.exports = Rutas