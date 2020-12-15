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
//Obtener todos los datos de romociones
function getPromociones(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_empresa = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM Promociones WHERE id_empresa = ' + id_empresa).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getPromociones = getPromociones;
//Crear datos de Promociones
function createPromociones(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conexion = yield database_1.conect();
        yield conexion.query('INSERT INTO Promociones SET ?', [newPost]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos insertados'
            });
        });
    });
}
exports.createPromociones = createPromociones;
//Eliminar Promociones
function deletePedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_promocion = req.params.id;
        console.log(id_promocion);
        const conexion = yield database_1.conect();
        yield conexion.query('DELETE FROM Promociones WHERE id_promocion = ?', [id_promocion]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos eliminado'
            });
        });
    });
}
exports.deletePedido = deletePedido;
