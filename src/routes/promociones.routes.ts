import { Router } from 'express';
import { getPromociones, createPromociones, deletePedido } from '../controllers/promociones.controller';

const router = Router();

router.route('/')
    .post(createPromociones);

router.route('/:id')
    .get(getPromociones)
    .delete(deletePedido);

export default router;
