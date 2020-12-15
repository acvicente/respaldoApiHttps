"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
//Obtener todos los datos de ImgBanner
function getImgBanner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_empresa = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM ImagenesBanner WHERE id_empresa = ' + id_empresa).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getImgBanner = getImgBanner;
//Registrar nuevo ImgBanner
function createImgBanner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conexion = yield database_1.conect();
        yield conexion.query('INSERT INTO ImagenesBanner SET ?', [newPost]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos insertados'
            });
        });
    });
}
exports.createImgBanner = createImgBanner;
//Eliminar ImgBanner
function deleteImgBanner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('DELETE FROM ImagenesBanner WHERE id_img_banner = ?', [id]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Imagen eliminada'
            });
        });
    });
}
exports.deleteImgBanner = deleteImgBanner;
