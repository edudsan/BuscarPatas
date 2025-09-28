import { Router } from 'express';

import { createAdocao, getAllAdocoes, updateAdocao, deleteAdocao} from '../controllers/adocaoController.js';

const router = Router();

router.post('/', createAdocao);
router.get('/', getAllAdocoes);
router.patch('/:id', updateAdocao);     
router.delete('/:id', deleteAdocao); 

export default router;