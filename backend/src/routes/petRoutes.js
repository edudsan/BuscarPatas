import { Router } from 'express';
import { uploadSingleImage } from '../middleware/uploadMiddleware.js'; 
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
  createPet, 
  getAllAvailablePets, 
  updatePet, 
  deletePet, 
  getAllPets, 
  getAllAdoptedPets,
  getDistinctEspecies 
} from '../controllers/petController.js';

const router = Router();

// --- ROTAS PROTEGIDAS PARA ADMINS ---
// Cria novo pet
router.post('/', protect, isAdmin, uploadSingleImage, createPet); 

// Atualiza pet
router.patch('/:id', protect, isAdmin, uploadSingleImage, updatePet);

// Deleta pet
router.delete('/:id', protect, isAdmin, deletePet);


// --- ROTAS PÚBLICAS ---
// Lista todos os pets com filtros e paginação
router.get('/', getAllPets); 

// Lista apenas pets disponíveis
router.get('/disponiveis', getAllAvailablePets); 

// Lista apenas pets adotados
router.get('/adotados', getAllAdoptedPets);

// Lista espécies únicas para filtros
router.get('/especies', getDistinctEspecies);

export default router;