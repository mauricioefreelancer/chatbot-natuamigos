require('dotenv').config()
const express = require('express')
const routes = require('./src/routes')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor de Natuamigos funcionando')
})

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
