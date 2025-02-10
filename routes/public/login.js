import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express()

app.use(express.json())

const router =  express.Router()

const prisma = new PrismaClient()

const JWT_SECRET  = process.env.JWT_SECRET

router.post('/login', async (req, res) => {

    try{
        const {email, password} = req.body

        const user = await prisma.user.findUnique({where: {email: email} })

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const hashPassword = await bcrypt.compare(password, user.password)

        if(!hashPassword){
            
            return res.status(400).json({message: 'senha incorrect'})
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1h'})

        return res.status(201).json({message: 'Login sucessfully', token})

    }catch(error){
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }

})


export default router