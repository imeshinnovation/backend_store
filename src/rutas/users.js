const Rutas = require('express').Router()
const usuarios = require('../controladores/personas')
const ventas = require('../controladores/ventas')
const articulos = require('../controladores/articulos')

//articulos.js
Rutas.get('/artt', async (req, res) => {
    res.json(await articulos.arttototal(req.params.arttototal))
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
Rutas.get('/ventau/:id?', async (req, res) => {
    res.json(await ventas.ventaunitaria(req.params.id))
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



// read a unique user
//Rutas.get('/usuarios/:id?', async (req, res) => {
//    res.json(await usuarios.unicousuario(req.params.id))
//})

module.exports = Rutas