import express from 'express'
import dotenv from 'dotenv'
import loginPage from  './routes/public/login.js'
import registerPage from  './routes/public/register.js'
import auth from './midllewares/auth.js'
import todoListPage from  './routes/private/toDoList.js'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


app.use( loginPage )
app.use( registerPage)
app.use( auth, todoListPage)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})