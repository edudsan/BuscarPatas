import { Router } from 'express';
import { createPet, getAllAvailablePets, updatePet, deletePet, getAllPets, getAllAdoptedPets} from '../controllers/petController.js';

const router = Router();

router.post('/', createPet);

router.get('/', getAllPets); 
router.get('/disponiveis', getAllAvailablePets);
router.get('/adotados', getAllAdoptedPets); 

router.patch('/:id', updatePet);

router.delete('/:id', deletePet);

export default router;