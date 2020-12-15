"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const correoSoporte_controller_1 = require("../controllers/correoSoporte.controller");
const router = express_1.Router();
router.route('/')
    .post(correoSoporte_controller_1.correoSoporte);
exports.default = router;
