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
// Obtener Detalle pedido especifico por Id
function getDetallePedidoId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params.id);
        const id_pedido = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM PedidosDetalle WHERE id_pedido = ?', [id_pedido]).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getDetallePedidoId = getDetallePedidoId;
// Registrar Detalle de pedidos
function createDetallePedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conexion = yield database_1.conect();
        yield conexion.query('INSERT INTO PedidosDetalle SET ?', [newPost]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos insertados',
            });
        });
    });
}
exports.createDetallePedido = createDetallePedido;
// Eliminar detalle del pedido
function deleteDetallePedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_pedido = req.params.id;
        console.log(id_pedido);
        const conexion = yield database_1.conect();
        yield conexion.query('DELETE FROM PedidosDetalle WHERE id_pedido = ? ', [id_pedido]).then((data) => {
            conexion.end();
            return res.json({
                message: 'Detalle pedido eliminado'
            });
        });
    });
}
exports.deleteDetallePedido = deleteDetallePedido;
