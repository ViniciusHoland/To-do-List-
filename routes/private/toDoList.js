import express from 'express'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const router = express.Router()

const prisma = new PrismaClient()

router.post('/todolist', async (req, res) => {

    try {

        const { title, description, date } = req.body

        const [dia, mes, ano] = date.split('/')
        const dateFormat = `${ano}-${mes}-${dia}`
        const newDate = new Date(dateFormat)

        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: 'User not found' })
        }

        const newToDoList = await prisma.list.create({
            data: {
                title,
                description,
                date: newDate,
                user: {
                    connect: { id: userId }
                }
            }

        })

        return res.status(201).json({ message: "created to do list successfully", newToDoList })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error for created investment' })
    }

})

router.get('/todolist', async (req, res) => {

    try {

        const userId = req.userId

        const todoList = await prisma.user.findUnique({
            where: { id: userId },
            include: { list: true }
        })

        res.status(200).json(todoList.list)

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })

    }



})

router.put('/todolist', async (req, res) => {


    try {
        const { idList, title, description, date } = req.body

        const [ dia, mes, ano ] = date.split('/')
        const dateFormat = `${ano}-${mes}-${dia}`
        const dateNew = new Date(dateFormat)

        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: 'User not found' })
        }

        const updateToDoList =  await prisma.list.update({
            where: {id : idList},
            data: {
                title,
                description,
                date: dateNew
            }
        })

        res.status(200).json(updateToDoList)


    }catch (error){
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }


})


router.delete('/todolist', async (req,res) => {

    try{

        const { idList } = req.body

        const userId = req.userId

        if(!userId){
            return res.status(401).json({ message: 'User not found' })
        }


        const todoListDelete = await prisma.list.delete({
            where : {id: idList}
        }) 


        if(!todoListDelete){
            return res.status(404).json({ message: 'List not found' })
        }

        res.status(200).json({message: 'List deleted successfully', todoListDelete : todoListDelete})


    }catch (error){
        console.error(error)
        res.status(500).json({ message: 'Id list not found' })
    }



})

export default router
