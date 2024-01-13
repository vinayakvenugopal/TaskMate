import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotenv.config()
import cookieParser from 'cookie-parser'

const port = process.env.PORT||5000 
connectDB();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// ===================== Setting Static Folder =====================
app.use(express.static('backend/Public'));


app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoute)

app.get('/',(req,res)=>res.send('Server started'))

app.use(notFound)      
app.use(errorHandler)

app.listen(2000,()=>console.log(`Server Started on Port ${port}`)) 