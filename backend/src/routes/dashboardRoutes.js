import { Router } from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js'; 
import { getDashboardCounts } from '../controllers/dashboardController.js'; 

const router = Router();

router.get('/counts', protect, isAdmin, getDashboardCounts); 

export default router;