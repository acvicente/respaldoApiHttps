import { Request, Response, json } from 'express';
import { conect } from '../database';
import { Informacion } from '../interface/informacion.interface';


//Obtener todos los datos de Informacion
export async function getInformacion(req: Request, res: Response){
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Informacion WHERE id_empresa = ' + id_empresa).then((data)=>{
        conexion.end();
        return res.json(data[0]);
    });
}

//Actualizar informacion en el Informacion
export async function updateInformacion(req: Request, res: Response) {
    const id_informacion = req.params.id;
    const updatePost: Informacion = req.body;
    console.log(id_informacion);
    const conexion = await conect();
    await conexion.query('UPDATE Informacion set ? WHERE id_informacion = ? AND id_empresa = ?', [updatePost, id_informacion, updatePost.id_empresa]).then((data)=>{
        conexion.end();
        return res.json({
            message: 'Datos actualizados'
        });
    });
}
