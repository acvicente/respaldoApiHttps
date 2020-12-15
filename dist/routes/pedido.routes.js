"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controllers/pedido.controller");
const router = express_1.Router();
router.route('/')
    .post(pedido_controller_1.createPedido);
router.route('/:id')
    .get(pedido_controller_1.getPedidoId)
    .delete(pedido_controller_1.deletePedido)
    .put(pedido_controller_1.updatePedido);
router.route('/pasarelaCliente')
    .post(pedido_controller_1.getPedidoBtnPagosCliente);
router.route('/pasarelaTodos')
    .post(pedido_controller_1.getPedidoBtnPagosTodosEmpresa);
router.route('/cedulaCliente')
    .post(pedido_controller_1.getPedidoCedulaCliente);
router.route('/notificacion')
    .post(pedido_controller_1.notificacionTransaccionPlacetoPay);
exports.default = router;
