import { Request, Response } from 'express';
import { conect } from '../database';
import { Configuracion } from '../interface/configuracion.interface';

//Obtener datos de Configuracion
export async function getConfiguracion(req: Request, res: Response) {
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Configuracion WHERE id_empresa = ' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

//Actualizar informacion en Administracion
export async function updateConfiguracion(req: Request, res: Response) {
    const id_configuracion = req.params.id;
    const id_empresa = req.body.id_empresa;
    const updatePost: Configuracion = req.body;
    const conexion = await conect();
    await conexion.query('UPDATE Configuracion SET ? WHERE id_configuracion = ? AND id_empresa = ?', [updatePost, id_configuracion, id_empresa]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos actualizados'
        });
    });
}