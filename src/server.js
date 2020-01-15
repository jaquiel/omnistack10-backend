const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')

const routes = require('./routes')

const app = express()

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


app.listen(3030)