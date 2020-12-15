import { Router } from 'express';
import { getDetallePedidoId, createDetallePedido, deleteDetallePedido } from '../controllers/pedido-detalle.controller';

const router = Router();

router.route('/')
    .post(createDetallePedido);

router.route('/:id')
    .get(getDetallePedidoId)
    .delete(deleteDetallePedido);

export default router;