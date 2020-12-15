"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pasarela_pago_controller_1 = require("../controllers/pasarela-pago.controller");
const router = express_1.Router();
router.route('/botones/:id')
    .get(pasarela_pago_controller_1.getBotonesPago);
exports.default = router;
