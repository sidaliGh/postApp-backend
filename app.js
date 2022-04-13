const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)












mongoose.connect(
  `${process.env.MONGO_URI}`
).then((result) => {
    app.listen(5000)
    console.log('mongoDB connected')
}).catch((err) => {
    console.log(err)
})
