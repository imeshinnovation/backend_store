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
Rutas.put('/artupdate', async (req, res) =>{
    res.json(await articulos.artupdate(req.body))
})

//ventas.js
Rutas.get('/ventat/:id?', async (req, res) => {
    res.json(await ventas.ventatotal(req.params.id))
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
Rutas.put('/bogupdate', async (req, res) =>{
    res.json(await bodega.bogupdate(req.body))
})

Rutas.post('/addbodega', async (req, res) => {
    res.json(await bodega.addbodega(req.body))
})

Rutas.get('/bogtotal', async (req, res) => {
    res.json(await bodega.bogtotal(req.params.bogtotal))
})
Rutas.get('/bogunitario/:id?', async (req, res) => {
    res.json(await bodega.bogunitario(req.params.id))
})


module.exports = Rutas