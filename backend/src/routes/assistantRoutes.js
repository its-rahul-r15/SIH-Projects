// backend/src/routes/assistantRoutes.js
import express from 'express';
import { postChat, getHistory } from '../controllers/assistantController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/history', authMiddleware, getHistory);    // GET history
router.post('/chat', authMiddleware, postChat);       // POST chat

export default router;
