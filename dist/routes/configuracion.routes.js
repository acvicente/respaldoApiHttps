"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configuracion_controller_1 = require("../controllers/configuracion.controller");
const router = express_1.Router();
router.route('/:id')
    .get(configuracion_controller_1.getConfiguracion);
router.route('/:id')
    .put(configuracion_controller_1.updateConfiguracion);
exports.default = router;
