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
//Obtener datos de Configuracion
function getConfiguracion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_empresa = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM Configuracion WHERE id_empresa = ' + id_empresa).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getConfiguracion = getConfiguracion;
//Actualizar informacion en Administracion
function updateConfiguracion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_configuracion = req.params.id;
        const id_empresa = req.body.id_empresa;
        const updatePost = req.body;
        const conexion = yield database_1.conect();
        yield conexion.query('UPDATE Configuracion SET ? WHERE id_configuracion = ? AND id_empresa = ?', [updatePost, id_configuracion, id_empresa]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos actualizados'
            });
        });
    });
}
exports.updateConfiguracion = updateConfiguracion;
