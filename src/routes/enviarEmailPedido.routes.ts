import { Router } from 'express';
import { correoDatos } from '../controllers/enviarEmailPedido.controller';

const router = Router();

router.route('/')
    .post(correoDatos);

export default router;