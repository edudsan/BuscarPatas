import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { uploadSingleImage } from '../middleware/uploadMiddleware.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();


router.post('/', protect, isAdmin, uploadSingleImage, uploadImage);

export default router;