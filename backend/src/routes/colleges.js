// backend/src/routes/colleges.js
import express from 'express';
import { getNearbyColleges } from '../controllers/collegeController.js';
const router = express.Router();
router.get('/', getNearbyColleges);
export default router;
