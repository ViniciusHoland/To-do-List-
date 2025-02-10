import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const app = express()

app.use(express.json())
const router = express.Router()
const prisma = new PrismaClient()

router.post('/register', async (req, res) => {

    try{

        const {name, email , password} = req.body

        const saltRounds = 10

        const hashPassword = await bcrypt.hash(password, saltRounds)


        const userIsExist = await prisma.user.findUnique({where: {email: email}})

        if(userIsExist){
            return res.status(400).json({message: 'user already exists, login in '})
        }

        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashPassword
            }
        })

        return res.status(201).json({message: 'user register with sucessfully'})

    }catch(error){
        res.status(500).json({ message: error.message })
    }



})


export default router