import { Router } from 'express';
import { getPedidoEmpresa } from '../controllers/pedidoEmpresa.controller';

const router = Router();

router.route('/:id')
    .get(getPedidoEmpresa);

export default router;