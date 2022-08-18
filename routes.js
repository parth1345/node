const express = require('express')
const app = express()
const port = 3000
const server = require('./server.js')

app.use('/', server)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))