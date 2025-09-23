// backend/src/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import collegeRoutes from './routes/colleges.js';
import quizRoutes from './routes/quiz.js';
import onboardingRoutes from "./routes/onboarding.js";
import careerMappingRoutes from './routes/careerMapping.js';

import assistantRoutes from './routes/assistantRoutes.js';
dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({
  origin: 'https://sih-projects-alwb.vercel.app',
  credentials: true, // if using cookies
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ ok: true }));


app.use('/api/colleges', collegeRoutes);
app.use('/api/quiz', quizRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use('/api/career-mapping', careerMappingRoutes);
app.use('/api/assistant', assistantRoutes); 


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
async function start() {
  try {
    if (!MONGO_URI) throw new Error('Set MONGO_URI in .env');
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server on', PORT));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
start();
