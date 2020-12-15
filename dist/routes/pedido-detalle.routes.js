"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_detalle_controller_1 = require("../controllers/pedido-detalle.controller");
const router = express_1.Router();
router.route('/')
    .post(pedido_detalle_controller_1.createDetallePedido);
router.route('/:id')
    .get(pedido_detalle_controller_1.getDetallePedidoId)
    .delete(pedido_detalle_controller_1.deleteDetallePedido);
exports.default = router;
