import express from 'express'
import babyroutes from './routes/babyroutes.mjs'
import foodroutes from './routes/foodroutes.mjs'
import drinkroutes from './routes/drinkroutes.mjs'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Middleware to parse JSON data
app.use(express.json())
app.use(express.static(path.join(__dirname, '_static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '_static', 'index.html'))
  })

app.use(cors()) // Enable CORS for all routes
app.use("/baby", babyroutes)
app.use("/food", foodroutes)
app.use("/drink", drinkroutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});