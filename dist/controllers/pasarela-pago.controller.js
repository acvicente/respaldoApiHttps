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
//Obtener Botones de pago de la empresa
function getBotonesPago(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_empresa = req.params.id;
        const conexion = yield database_1.conect();
        yield conexion.query('SELECT * FROM BotonesPago WHERE id_empresa = ' + id_empresa).then((data) => {
            conexion.end();
            return res.json(data[0]);
        });
    });
}
exports.getBotonesPago = getBotonesPago;
// //Obtener Botones de pago de la empresa
// export async function getPasarelasPago(req: Request, res: Response) {
//     const id_boton = req.params.id;
//     const conexion = await conect();
//     await conexion.query('SELECT * FROM PasarelaPago WHERE id_boton = ' + id_boton).then((data) => {
//         conexion.end();
//         return res.json(data[0]);
//     });
// }
