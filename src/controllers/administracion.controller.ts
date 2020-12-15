import { Request, Response } from 'express';
import { conect } from '../database';
import { Administracion } from '../interface/administracion.interface';

//Obtener datos de Administracion
export async function getAdministracion(req: Request, res: Response) {
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Administracion WHERE id_empresa =' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

//Actualizar informacion en Administracion
export async function updateAdministracion(req: Request, res: Response) {
    const id_administracion = req.body.id_administracion;
    const id_empresa = req.body.id_empresa;
    const updatePost: Administracion = req.body;
    const conexion = await conect();
    await conexion.query('UPDATE Administracion set ? WHERE id_administracion = ? AND id_empresa = ?', [updatePost, id_administracion, id_empresa]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos actualizados'
        });
    });


}