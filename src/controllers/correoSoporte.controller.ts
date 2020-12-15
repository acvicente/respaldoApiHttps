import { Request, Response } from 'express';


// Enviar correo con el pedido
export async function correoSoporte(req: Request, res: Response) {

    const nodemailer = require("nodemailer");

    var mail = req.body.correo_api;
    var pass = req.body.password_correo_api;
    var mailEmpresa = req.body.correo_personal_api;
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: mail,
            pass: pass
        }
    });

    let info = await transporter.sendMail({
        from: mail, // sender address
        to: [req.body.receptor, mail, mailEmpresa], // list of receivers
        subject: "Inquietudes o sugerencias", // Subject line
        text: "Hola", // plain text body
        html: req.body.h // html body
    }, (err: any, info: any)=>{
        if(err){
            return res.json({
                message: 'Error al enviar correo Soporte',
                data: err,
                ok: false
            });
        }
        if(info){
            return res.json({
                message: 'se envio el correo Soporte',
                // data: info,
                ok: true
            });
        }
    });

}