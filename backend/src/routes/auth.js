// backend/src/routes/auth.js
import express from 'express';
import { login, me, register } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);


export default router;
