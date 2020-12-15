"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enviarEmailPedido_controller_1 = require("../controllers/enviarEmailPedido.controller");
const router = express_1.Router();
router.route('/')
    .post(enviarEmailPedido_controller_1.correoDatos);
exports.default = router;
