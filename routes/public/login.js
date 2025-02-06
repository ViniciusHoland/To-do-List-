import express from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()

app.use(express.json())

const router =  express.Router()

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {

    try{
        const {email, password} = req.body

        const user = await prisma.user.findUnique({where: {email: email} })

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        if(user.password === password){
            res.status(201).json({message: 'Login sucessfully'})
        }

        return res.status(400).json({message: 'senha incorrect'})

    }catch(error){
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }

})


export default router