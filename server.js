import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes  } from './routes/authRoutes.js';
import { movieRoutes  } from './routes/movieRoutes.js';

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movies', movieRoutes)

mongoose.connect(process.env.DB_URI, { dbName: 'demo_db' })
.then((res) => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Running ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.error(err)
})