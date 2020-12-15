"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenesBanner_controller_1 = require("../controllers/imagenesBanner.controller");
const router = express_1.Router();
router.route('/:id')
    .get(imagenesBanner_controller_1.getImgBanner);
router.route('/:id')
    .delete(imagenesBanner_controller_1.deleteImgBanner);
router.route('/')
    .post(imagenesBanner_controller_1.createImgBanner);
exports.default = router;
