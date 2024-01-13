const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const schedule = require('node-schedule')
require('module-alias/register')
const cleanUpToken = require('@tasks/token/clean_up_token.task')
const ApiRouteV1 = require('@routes/v1/api.route')
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'src', 'public')))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

const corsOptions = {
  origin: '*',
  exposedHeaders: ['Content-Disposition'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', ApiRouteV1)

schedule.scheduleJob('0 0 * * *', cleanUpToken) // Run every 00:00 AM

const port = process.env.APP_PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})