import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
// import posts from '__fixtures__/posts.json'
import routes from 'routes'
import initDB, { connection } from 'initDB'
import post from 'mappers/post'
import path from 'path'
;(async () => {
  const app = express()

  const HOST = 'localhost'
  const PORT = process.env.PORT || 3000

  const server = http.createServer(app)

  initDB()

  app.use(cors())
  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'views')))
  app.use(routes)
  //   initAPI(app)
  app.get('/healthcheck', (__, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    res.status(200).send(data)
  })

  app.get('/posts', async (req, res) => {
    try {
      const result = await connection.execute('select * from posts')
      const posts = Array.from(result.rows || []).map((row) => post(row).toMap())
      res.status(200).json({ posts })
    } catch (error) {
      console.error(error)
      res.status(500).send('error from posts')
    }
  })

  app.get('/homepage', (__, res) => {
    res.sendFile(path.resolve(__dirname + '/views/index.html'))
  })

  server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
  })
})()
