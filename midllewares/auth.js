import express from 'express';
import jwt from 'jsonwebtoken'

const app  = express()
app.use(express.json())

const router = express.Router()

function verifyToken(req, res, next){

    try{

        const header = req.headers.authorization

        const token = header.split(' ')[1]

        if(!token){
            return res.status(403).json({message: 'Token not provided'})
        }

        const JWT_SECRET = process.env.JWT_SECRET

        const data = jwt.verify(token, JWT_SECRET)

        next()

    }catch(err){
        return res.status(403).json({message: 'Token invalid or expired'})
    }


}

export default verifyToken
