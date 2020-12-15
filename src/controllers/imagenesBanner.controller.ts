import { Request, Response } from 'express';
import { conect } from '../database';
import { imagenesBanner } from '../interface/imagenesBanner.interface'

//Obtener todos los datos de ImgBanner
export async function getImgBanner(req: Request, res: Response) {
    const id_empresa = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM ImagenesBanner WHERE id_empresa = ' + id_empresa).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

//Registrar nuevo ImgBanner
export async function createImgBanner(req: Request, res: Response) {
    const newPost: imagenesBanner = req.body;
    const conexion = await conect();
    await conexion.query('INSERT INTO ImagenesBanner SET ?', [newPost]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos insertados'
        });
    });
}

//Eliminar ImgBanner
export async function deleteImgBanner(req: Request, res: Response) {
    const id = req.params.id;
    const conexion = await conect();
    await conexion.query('DELETE FROM ImagenesBanner WHERE id_img_banner = ?', [id]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Imagen eliminada'
        });
    });
}

