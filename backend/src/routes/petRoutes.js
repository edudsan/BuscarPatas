import { Router } from 'express';
import { createPet, getAllAvailablePets, updatePet, deletePet } from '../controllers/petController.js';

const router = Router();

router.post('/', createPet);
router.get('/disponiveis', getAllAvailablePets);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;