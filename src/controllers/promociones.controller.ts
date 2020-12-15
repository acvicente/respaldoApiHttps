import { Request, Response } from 'express';
import { conect } from '../database';
import { Promociones } from '../interface/promociones.interface';

//Obtener todos los datos de romociones
export async function getPromociones(req: Request, res: Response){
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Promociones WHERE id_empresa = ' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

//Crear datos de Promociones
export async function createPromociones(req: Request, res: Response){
    const newPost: Promociones = req.body;
    const conexion = await conect();
    await conexion.query('INSERT INTO Promociones SET ?', [newPost]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos insertados'
        });
    });
}

//Eliminar Promociones
export async function deletePedido(req: Request, res: Response){
    const id_promocion = req.params.id;
    console.log(id_promocion);
    const conexion = await conect();
    await conexion.query('DELETE FROM Promociones WHERE id_promocion = ?', [id_promocion]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos eliminado'
        });
    });
}
