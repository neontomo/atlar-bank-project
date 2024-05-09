import express, { Express } from 'express'
import dotenv from 'dotenv'
import { config } from './config'
import accountsRouter from './api/v1/accounts'

// Initialise express

dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use(`/api/${config.apiVersion}/accounts`, accountsRouter)

app.use(`/*`, (req, res) => {
  res.send({
    message: 'Welcome to the bank API, where your dreams become reality.',
    getStarted: 'Please visit /api/v1/accounts',
    docs: 'https://github.com/neontomo/atlar-bank-project',
    author: 'Tomo Myrman',
    fun: true
  })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[server]: Server is running. API running at http://localhost:${port}/api/${config.apiVersion}`
    )
  })
} else {
  console.log(`[server]: Server is running in TEST mode`)
}

module.exports = app
