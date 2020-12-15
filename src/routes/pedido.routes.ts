import { Router } from 'express';
import { getPedidoId, createPedido, deletePedido, updatePedido, getPedidoBtnPagosCliente, getPedidoBtnPagosTodosEmpresa, getPedidoCedulaCliente, notificacionTransaccionPlacetoPay } from '../controllers/pedido.controller';

const router = Router();

router.route('/')
    .post(createPedido);

router.route('/:id')
    .get(getPedidoId)
    .delete(deletePedido)
    .put(updatePedido)

router.route('/pasarelaCliente')
    .post(getPedidoBtnPagosCliente)

router.route('/pasarelaTodos')
    .post(getPedidoBtnPagosTodosEmpresa)

router.route('/cedulaCliente')
    .post(getPedidoCedulaCliente)

router.route('/notificacion')
    .post(notificacionTransaccionPlacetoPay)


export default router;