import express from 'express';
import { connectDB } from './db/mongo.js';
import authRoutes from './routes/auth.routes.js';
const app = express();
await connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
