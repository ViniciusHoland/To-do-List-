import express from 'express';
import { Router } from 'express';

const app = express()

app.use(express.json())

const router =  express.Router()

router.post('/login', async (req, res) => {

   

    res.status(201).json({message: 'Login sucessfully'})

})


export default router