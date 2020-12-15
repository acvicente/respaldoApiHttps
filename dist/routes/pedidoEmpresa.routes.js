"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoEmpresa_controller_1 = require("../controllers/pedidoEmpresa.controller");
const router = express_1.Router();
router.route('/:id')
    .get(pedidoEmpresa_controller_1.getPedidoEmpresa);
exports.default = router;
