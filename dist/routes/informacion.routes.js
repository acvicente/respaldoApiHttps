"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const informacion_controller_1 = require("../controllers/informacion.controller");
const router = express_1.Router();
router.route('/:id')
    .get(informacion_controller_1.getInformacion);
router.route('/:id')
    .put(informacion_controller_1.updateInformacion);
exports.default = router;
