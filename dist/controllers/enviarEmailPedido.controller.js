"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Enviar correo con el pedido
function correoDatos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let info = yield transporter.sendMail({
            from: mail,
            to: [req.body.receptor, mail, mailEmpresa],
            subject: "Notificación de compra",
            text: "Hola !!!",
            html: req.body.h // html body
        }, (err, info) => {
            if (err) {
                return res.json({
                    message: 'Error al enviar correo',
                    data: err,
                    ok: false
                });
            }
            if (info) {
                return res.json({
                    message: 'se envio el correo',
                    // data: info,
                    ok: true
                });
            }
        });
    });
}
exports.correoDatos = correoDatos;
