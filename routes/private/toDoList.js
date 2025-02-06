import express from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const router = express.Router()

const prisma = new PrismaClient()

routet.post('/todolist', async (req, res) => {

    try{

        const {title, description , date} = req.body

        const newToDoList = await prisma.list.create({
            data: {
                title,
                description,
                date
            }
        })

        return res.status(201).json({message: "created to do list successfully"})

    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})

export default router
