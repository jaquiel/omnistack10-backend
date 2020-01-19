const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebSocket } = require('./websocket.js')

const app = express()
const server = http.Server(app)

setupWebSocket(server)

const dbUrl = 'mongodb+srv://Omnistack10:Omnistack10@omnistack10-89pzq.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(
    dbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })

//app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3030)