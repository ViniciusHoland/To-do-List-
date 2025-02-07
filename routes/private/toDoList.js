import express from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const router = express.Router()

const prisma = new PrismaClient()

router.post('/todolist', async (req, res) => {

    try{

        const {title, description , date} = req.body

        console.log(req.body)

        const [dia, mes , ano] = date.split('/')
        const dateFormat =  `${ano}-${mes}-${dia}`
        const newDate = new Date(dateFormat)

        const auth =  req.headers.authorization
        const token = auth.split(' ')[1]

        if(!token){
            return res.status(401).json({message: 'Token not provided or invalid'})
        }

        const JWT_SECRET = process.env.JWT_SECRET

        const decodedToken = jwt.verify(token, JWT_SECRET)
        
        const user = await prisma.user.findUnique({where: { id : decodedToken.id}})

        if(!user){
            return res.status(401).json({message: 'User not found'})
        }

        const userId = user.id

        const newToDoList = await prisma.list.create({
            data: {
                title,
                description,
                date: newDate,
                user:  {
                    connect: {id: userId}
                } 
            }
    
        })

        return res.status(201).json({message: "created to do list successfully"})

    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error for created investment' })
    }

})

router.get('/todolist', async (req,res) => {

    try{

        const auth =  req.headers.authorization
        const token = auth.split(' ')[1]

        if(!token){
            return res.status(401).json({message: 'Token not provided or invalid'})
        }

        const JWT_SECRET = process.env.JWT_SECRET

        const decodedToken = jwt.verify(token, JWT_SECRET)

        const user = await prisma.user.findUnique({where:{ id : decodedToken.id} })

        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        const todolist = await prisma.

        res.status(200).json({message: 'todolist successfully'})

    }catch(error){
        return res.status(500).json({message: 'Internal Server Error'})
    
    }



})

export default router
