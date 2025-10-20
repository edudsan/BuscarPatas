import { Router } from 'express';
import { uploadSingleImage } from '../middleware/uploadMiddleware.js'; 
import { createPet, getAllAvailablePets, updatePet, deletePet, getAllPets, getAllAdoptedPets} from '../controllers/petController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

//  ROTAS PROTEGIDAS PARA ADMINS 
router.post('/', protect, isAdmin, uploadSingleImage, createPet); 
router.patch('/:id', protect, isAdmin, updatePet);
router.delete('/:id', protect, isAdmin, deletePet);


//  ROTAS PÚBLICAS 
router.get('/', getAllPets); 
router.get('/disponiveis', getAllAvailablePets);
router.get('/adotados', getAllAdoptedPets); 


export default router;