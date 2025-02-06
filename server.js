import express from 'express'
import dotenv from 'dotenv'
import loginPage from  './routes/public/login.js'
import registerPage from  './routes/public/register.js'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


app.use( loginPage )
app.use( registerPage)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})