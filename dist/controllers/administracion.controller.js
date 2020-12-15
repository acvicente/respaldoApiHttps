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
//Obtener datos de Administracion
function getAdministracion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_empresa = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM Administracion WHERE id_empresa =' + id_empresa).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getAdministracion = getAdministracion;
//Actualizar informacion en Administracion
function updateAdministracion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_administracion = req.body.id_administracion;
        const id_empresa = req.body.id_empresa;
        const updatePost = req.body;
        const conexion = yield database_1.conect();
        yield conexion.query('UPDATE Administracion set ? WHERE id_administracion = ? AND id_empresa = ?', [updatePost, id_administracion, id_empresa]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos actualizados'
            });
        });
    });
}
exports.updateAdministracion = updateAdministracion;
