import { Request, Response } from 'express';
import { conect } from '../database';
import { pedidoDetalle } from '../interface/pedido-detalle.interface';

// Obtener Detalle pedido especifico por Id
export async function getDetallePedidoId(req: Request, res: Response) {
    console.log(req.params.id);

    const id_pedido = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM PedidosDetalle WHERE id_pedido = ?', [id_pedido]).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

// Registrar Detalle de pedidos
export async function createDetallePedido(req: Request, res: Response) {
    const newPost: pedidoDetalle = req.body;
    const conexion = await conect();
    await conexion.query('INSERT INTO PedidosDetalle SET ?', [newPost]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos insertados',
        });
    });
}

// Eliminar detalle del pedido
export async function deleteDetallePedido(req: Request, res: Response) {
    const id_pedido = req.params.id;
    console.log(id_pedido);
    const conexion = await conect();
    await conexion.query('DELETE FROM PedidosDetalle WHERE id_pedido = ? ', [id_pedido]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Detalle pedido eliminado'
        });
    });
}