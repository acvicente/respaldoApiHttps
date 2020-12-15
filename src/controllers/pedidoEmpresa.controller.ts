import { Request, Response } from 'express';
import { conect } from '../database';
import { pedidoEmpresa } from '../interface/pedidoEmpresa.interface';


//Obtener todos los datos de Pedido
export async function getPedidoEmpresa(req: Request, res: Response) {
    const id_empresa = req.params.id;
    console.log(id_empresa);
    const conexion = await conect();
    await conexion.query('SELECT * FROM Pedidos WHERE id_empresa = ' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}