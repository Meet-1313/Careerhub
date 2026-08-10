import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import dashboardRoutes from "./routes/dashboardRoutes.js";
import path from 'path';
import { fileURLToPath } from "url";    
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.get('/',(req,res) => {
    res.send('Hello World!');
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
});

