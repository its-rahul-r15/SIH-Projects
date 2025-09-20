// backend/src/routes/quiz.js
import express from 'express';
import { submitQuiz } from '../controllers/quizController.js';
const router = express.Router();
router.post('/submit', submitQuiz);
export default router;
