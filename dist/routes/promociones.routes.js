"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promociones_controller_1 = require("../controllers/promociones.controller");
const router = express_1.Router();
router.route('/')
    .post(promociones_controller_1.createPromociones);
router.route('/:id')
    .get(promociones_controller_1.getPromociones)
    .delete(promociones_controller_1.deletePedido);
exports.default = router;
