import { Request, Response } from 'express';


// Enviar correo con el pedido
export async function correoDatos(req: Request, res: Response) {
    const nodemailer = require("nodemailer");

    // console.log(req.body);
    
    var mail = req.body.correo_api;
    var pass = req.body.password_correo_api;
    var mailEmpresa = req.body.correo_personal_api;

    // console.log(mail);
    // console.log(pass);
    // console.log(mailEmpresa);
    
    
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
        subject: "Notificación de compra", // Subject line
        text: "Hola !!!", // plain text body
        html: req.body.h // html body
    }, (err: any, info: any)=>{
        if(err){
            return res.json({
                message: 'Error al enviar correo',
                data: err,
                ok: false
            });
        }
        if(info){
            return res.json({
                message: 'se envio el correo',
                // data: info,
                ok: true
            });
        }
    });

}