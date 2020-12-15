"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administracion_controller_1 = require("../controllers/administracion.controller");
const router = express_1.Router();
router.route('/:id')
    .get(administracion_controller_1.getAdministracion);
router.route('/')
    .put(administracion_controller_1.updateAdministracion);
exports.default = router;
