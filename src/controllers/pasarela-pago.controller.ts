import { Request, Response } from 'express';
import { conect } from '../database';
import { boton, pasarela } from '../interface//pasarela-pago.interface';

//Obtener Botones de pago de la empresa
export async function getBotonesPago(req: Request, res: Response) {
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM BotonesPago WHERE id_empresa = ' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

// //Obtener Botones de pago de la empresa
// export async function getPasarelasPago(req: Request, res: Response) {
//     const id_boton = req.params.id;
//     const conexion = await conect();
//     await conexion.query('SELECT * FROM PasarelaPago WHERE id_boton = ' + id_boton).then((data) => {
//         conexion.end();
//         return res.json(data[0]);
//     });
// }