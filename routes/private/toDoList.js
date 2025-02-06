import express from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const router = express.Router()

const prima = new PrismaClient()

routet.post('/todolist', async (req, res) => {

    try{

        const {title, description , date} = req.body




    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})


