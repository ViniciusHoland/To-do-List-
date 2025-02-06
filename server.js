import express from 'express'
import dotenv from 'dotenv'
import { Router } from 'express'
import loginPage from  './routes/public/login.js'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

const router = Router()

app.use( loginPage )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})