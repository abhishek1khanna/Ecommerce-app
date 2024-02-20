import express from 'express';
import Color  from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoutes.js';

import cors from 'cors';
import path from 'path';


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // to send and receieve JSON responses
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './client/build')));


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);


app.get('/', (req, res) => {
  res.send('<h1>welcome to exomerce app!</h1>');
});


const port = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode, port ${port}!`);
});

