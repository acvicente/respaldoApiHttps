import { Request, Response } from 'express';
import { conect } from '../database';
import { Pedido, notificacionPlacetopay } from '../interface/pedido.interface';

var Hashes = require('jshashes');
var SHA1 = new Hashes.SHA1

//Registrar nuevo Pedido
export async function createPedido(req: Request, res: Response) {
    const newPost: Pedido = req.body;
    const conexion = await conect();
    await conexion.query('INSERT INTO Pedidos SET ?', [newPost]).then((dataPedido) => {
        conexion.query('SELECT * FROM `Pedidos` WHERE id_pedido = (SELECT (MAX(id_pedido)) AS id FROM Pedidos)').then((data) => {
            conexion.end();
            return res.json({
                message: 'Datos insertados',
                res: data
            });
        });
    });

}

//Obtener Pedido especifico por Id
export async function getPedidoId(req: Request, res: Response) {
    const id = req.params.id;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Pedidos WHERE id_pedido = ?', [id]).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

//Eliminar Pedido
export async function deletePedido(req: Request, res: Response) {
    const id_pedido = req.params.id;
    const conexion = await conect();
    await conexion.query('DELETE FROM Pedidos WHERE id_pedido = ? ', [id_pedido]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos pedido eliminado'
        });
    });
}

//Actualizar informacion en el pedido
export async function updatePedido(req: Request, res: Response) {
    const id_pedido = req.params.id;
    const updatePost: Pedido = req.body;
    const conexion = await conect();
    await conexion.query('UPDATE Pedidos set ? WHERE id_pedido = ?', [updatePost, id_pedido]).then((data) => {
        conexion.end();
        return res.json({
            message: 'Datos actualizados'
        });
    });
}

// Obtener Pedidos realizados por boton de Pagos de un cliente especifico
export async function getPedidoBtnPagosCliente(req: Request, res: Response) {
    const dataUser: Pedido = req.body;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Pedidos WHERE pasarela_pago = ? AND cedula_cliente = ? AND id_empresa = ?', [dataUser.pasarela_pago, dataUser.cedula_cliente, dataUser.id_empresa]).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

// Obtener Todos lds Pedidos realizados por boton de Pagos
export async function getPedidoBtnPagosTodosEmpresa(req: Request, res: Response) {
    const dataUser: Pedido = req.body;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Pedidos WHERE pasarela_pago = ? AND id_empresa = ?', [dataUser.pasarela_pago, dataUser.id_empresa]).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

// Obtener Todos los Pedidos por cedula cliente
export async function getPedidoCedulaCliente(req: Request, res: Response) {
    const dataUser: Pedido = req.body;
    const conexion = await conect();
    await conexion.query('SELECT * FROM Pedidos WHERE cedula_cliente = ? AND id_empresa = ? ORDER BY id_pedido DESC', [dataUser.cedula_cliente, dataUser.id_empresa]).then((data) => {
        conexion.end();
        return res.json(data[0]);
    });
}

// Funcion de notificacion, OJO INSTALAR LIBRERIA SH1 EN EL PROYECTO DE API HTTPS
// Realizar accion al notificar estado transaccion Place toPay
export async function notificacionTransaccionPlacetoPay(req: Request, res: Response) {
    console.log("Puerto", req.body.puerto);

    // Guardar Json enviado de la pasarela
    const notificacion: notificacionPlacetopay = req.body.dato;
    var tipoPedido;
    var puerto = req.body.puerto;

    // Abrir la conexion a la BD
    const conexion = await conect();

    // Obtener datos del Pedido
    const pedido = await conexion.query('SELECT * FROM Pedidos WHERE id_pedido = ? ', [notificacion.reference]).then((data: any) => {
        return data[0];
    });

    if (pedido.length > 0) {

        const botonesPago = await conexion.query('SELECT * FROM BotonesPago WHERE id_empresa = ' + pedido[0].id_empresa).then((data: any) => {
            return data[0];
        });

        var dataBtnPago: any;

        if (botonesPago.length > 0) {
            // Obtener data del boton de pago
            botonesPago.forEach((pasarela: any) => {
                if (pasarela.nombre == 'PlacetoPay') {
                    dataBtnPago = pasarela;
                    tipoPedido = 7;
                }
                // Se puede hacerlo para los demas botonos de pago
                // if (pasarela.nombre == 'DataFast') {
                //     dataBtnPago = pasarela;
                // }
            });

            if (dataBtnPago) {
                // Validar si es respuesta de PlacetoPay verdadera
                const signature = notificacion.requestId + notificacion.status.status + notificacion.status.date + dataBtnPago.secret_key;
                let sh1 = SHA1.hex(signature);
                console.log(sh1);

                // Aqui hacer todo el proceso de actualizar estado BD y enviar correo
                if (notificacion.signature == sh1) {

                    if (notificacion.status.status == 'APPROVED') {
                        if (pedido[0].estado_transaccion != 'APPROVED') {

                            pedido[0].estado_transaccion = notificacion.status.status;
                            pedido[0].id_transaccion = notificacion.requestId;
                            console.log('Enviar correo u actualizar BD');

                            // Obtener productos que forman parte del pedio
                            const detallePedido = await conexion.query('SELECT * FROM PedidosDetalle WHERE id_pedido = ? ', [notificacion.reference]).then((data: any) => {
                                return data[0];
                            });

                            // Obtener Configuracion de la empresa
                            const configuracion = await conexion.query('SELECT * FROM Configuracion WHERE id_empresa = ? ', [pedido[0].id_empresa]).then((data: any) => {
                                return data[0];
                            });

                            // Obtener Informacion de la empresa
                            const informacion = await conexion.query('SELECT * FROM Informacion WHERE id_empresa = ? ', [pedido[0].id_empresa]).then((data: any) => {
                                return data[0];
                            });

                            let dataEmail = {
                                pedido: pedido[0],
                                detallePedido: detallePedido,
                                configuracion: configuracion[0],
                                nombre_empresa: informacion[0].nombre,
                                tipoPedido: tipoPedido
                            }

                            // Crear el cuerpo del correo
                            await crearCuerpoCorreo(dataEmail);

                            // Actualizar estado del pedido
                            await conexion.query('UPDATE Pedidos set ? WHERE id_pedido = ?', [pedido[0], notificacion.reference]).then((data) => {
                                return res.json({
                                    rta: true,
                                    mensaje: "Transaccion Aprobada, Pedido actualizado.",
                                    puerto: puerto
                                });
                            });
                        } else {
                            return res.json({
                                rta: true,
                                mensaje: "Transaccion Aprobada, Pedido actualizado desde la Pagina Web",
                                puerto: puerto
                            });
                        }
                    }

                    if (notificacion.status.status == 'REJECTED') {
                        console.log('Eliminar de la BD el pedido');
                        await conexion.query('DELETE FROM PedidosDetalle WHERE id_pedido = ? ', [notificacion.reference]).then((data) => { });
                        await conexion.query('DELETE FROM Pedidos WHERE id_pedido = ? ', [notificacion.reference]).then((data) => { });
                        return res.json({
                            rta: true,
                            mensaje: "Transaccion Rechazada, Pedido Eliminado.",
                            puerto: puerto
                        });
                    }

                } else {
                    return res.json({
                        rta: false,
                        mensaje: "Error, Signature no válido"
                    });
                }

            } else {
                return res.json({
                    rta: false,
                    mensaje: "La tienda no posee el boton PlacetoPay"
                });
            }

        } else {
            return res.json({
                rta: false,
                mensaje: "La tienda no posee botones de pago"
            });
        }
    } else {
        return res.json({
            rta: false,
            mensaje: "No existe el Pedido"
        });
    }
    // Cerrar conexion a la BD
    conexion.end();
}

export async function crearCuerpoCorreo(datosEmail: any) {
    var pedido = datosEmail.pedido;
    var id_pedido = datosEmail.pedido.id_pedido;
    var tipoPedido = datosEmail.tipoPedido;
    var nombreEmpresa = datosEmail.nombre_empresa;
    var carrito = [];
    var configuracion = datosEmail.configuracion;
    var codigoDescuento = datosEmail.pedido.numeroCodigoDescuento;
    var html: any;

    for (var i = 0; i < datosEmail.detallePedido.length; i++) {
        let prod = {
            nombre: datosEmail.detallePedido[i].producto,
            cantidad: datosEmail.detallePedido[i].cantidad,
            id_prod: datosEmail.detallePedido[i].pro_cod,
            precio: datosEmail.detallePedido[i].precio_u,
            img_web: '',
            stockReal: 0
        };
        carrito.push(prod);
    }

    html = '<table style="font-family:arial; border:1px solid #e8e6e6; border-top:none; border-bottom:none; border-spacing:0; max-width:600px; color:#707173; border-radius:40px;" align="center">';

    // Imagen de la cabecera
    html += '<thead>';
    html += '<tr>';
    html += '<td style="padding:0">';
    html += '<img style="width:100%; border-radius:20px 20px 0 0" src="https://drive.google.com/uc?export=view&id=1IPFTQvZ0W8OVzZRayypTKDExvMPjJyVm">';
    html += '</td>';
    html += '</tr>';
    html += '</thead>';

    html += '<tbody>'

    // Texto del encabezado
    html += '<tr>';
    html += '<td style="font-size:20px; text-align:center; padding:10px 0 8px 0; display:block">';
    html += '<span>Hola, </span>';
    html += '<strong><span>' + pedido.nombres + '</span></strong>';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td style="font-size:23px; text-align:center; padding:10px 15px 25px 15px;display:block">';
    html += '<span>Tu compra en la Tienda en línea </span>';
    html += '<strong><span> ' + nombreEmpresa + ' </span></strong>';
    html += '<span> ha sido </span>';
    html += '<span style="color:#7dd855; text-transform:uppercase; font-size:25px; margin-top:3px"> Exitosa</span>';
    html += '</td>';
    html += '</tr>';

    // Encabezado datos de factura
    html += '<tr>';
    html += '<td';
    html += '<div width="100%">'
    html += '<table style="font-family:arial; border:1px solid #e8e6e6; color:#707173; padding: 5px;" align="center" width="95%">';

    html += '<tr>';
    html += '<td><strong>Cliente: </strong><span>' + pedido.nombres + ' ' + pedido.apellidos + '</span></td>';
    html += '<td><strong>Fecha: </strong><span>' + pedido.fecha_pedido + '</span></td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td><strong>Cédula/Ruc: </strong><span>' + pedido.cedula_cliente + '</span></td>';
    html += '<td><strong>Ciudad: </strong><span>' + pedido.ciudad + '</span></td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td><strong>Teléfono: </strong><span>' + pedido.telefono + '</span></td>';
    html += '<td><strong>Dirección: </strong><span>' + pedido.direccion_cliente + '</span></td>';
    html += '</tr>';

    html += '</table>';
    html += '</div>'
    html += '</td>';
    html += '</tr>';


    // Texto Detalle del pedido
    html += '<tr>';
    html += '<td style="font-size: 17px; color:#707173; text-align: center; padding: 10px 0;">';
    html += '<span><strong>Detalle del Pedido</strong></span>';
    html += '</td>';
    html += '</tr>';


    // Detalle productos del pedido
    html += '<tr>';
    html += '<td>';
    html += '<div width="100%">'
    html += '<table style="font-family:arial; border:1px solid #e8e6e6; border-collapse:collapse; color:#707173; margin-bottom: 10px;" align="center" width="95%">'

    html += '<tr>';
    html += '<td style="border:1px solid #e8e6e6;">Cant.</td>';
    html += '<td style="border:1px solid #e8e6e6;">Cod.</td>';
    html += '<td style="border:1px solid #e8e6e6;">Detalle</td>';
    html += '<td style="border:1px solid #e8e6e6;">P.Unitario</td>';
    html += '<td style="border:1px solid #e8e6e6;">P.Total</td>';
    html += '</tr>';

    carrito.forEach(det => {
        html += '<tr>';
        html += '<td> ' + det.cantidad + ' </td>';
        html += '<td> ' + det.id_prod + ' </td>';
        html += '<td> ' + det.nombre + ' </td>';
        html += '<td> ' + det.precio + ' </td>';
        html += '<td> ' + (det.precio * det.cantidad) + ' </td>';
        html += '</tr>';
    });

    html += '</table>';
    html += '</div>'
    html += '</td>';
    html += '</tr>';


    // Totales y descuentos
    html += '<tr>';
    html += '<td>';
    html += '<div width="100%">';
    html += '<table style="font-family:arial; font-size: 14px; color:#707173; margin-bottom: 10px;" align="center" width="95%">';

    if (tipoPedido != 1) {
        if (tipoPedido == 4 || tipoPedido == 6 || tipoPedido == 7) {

            html += '<tr>';
            html += '<td>';
            html += '<strong>Total Compra: </strong><span> ' + pedido.total + ' </span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td>';
            html += '<strong> ' + configuracion.txtRecargoTarjetaC + ' : </strong><span> ' + pedido.recargoTarjeta + ' </span>';
            html += '</td>';
            html += '</tr>';

            if (codigoDescuento.aplicado == true) {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código </strong><span> ( ' + codigoDescuento.codigo + ' ): ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            } else {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código: </strong><span> ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            }

            html += '<tr>';
            html += '<td style="padding-bottom: 10px;">';
            html += '<strong>Costo de envío: </strong><span> ' + pedido.costoEnvio + ' </span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="text-align: center; font-size: 16px; background-color: #f31149;">';
            html += '<td style="border:1px solid #e8e6e6; padding: 5px; color: white;">';
            html += '<strong>Total a Pagar: </strong><span> ' + pedido.totalPagar + ' </span>';
            html += '</td>';
            html += '</tr>';

        } else {

            html += '<tr>';
            html += '<td>';
            html += ' <strong>Total Compra: </strong><span> ' + pedido.total + ' </span>';
            html += '</td>';
            html += '</tr>';

            if (codigoDescuento.aplicado == true) {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código </strong><span> ( ' + codigoDescuento.codigo + ' ): ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            } else {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código: </strong><span> ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            }

            html += '<tr>';
            html += '<td style="padding-bottom: 10px;">';
            html += '<strong>Costo de envío: </strong><span> ' + pedido.costoEnvio + ' </span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="text-align: center; font-size: 16px; background-color: #f31149;">';
            html += '<td style="border:1px solid #e8e6e6; padding: 5px; color: white;">';
            html += '<strong>Total a Pagar: </strong><span> ' + pedido.totalPagar + ' </span>';
            html += '</td>';
            html += '</tr>';
        }
    } else {
        if (configuracion.aplicarCostoEnvioBtn1 == 0) {

            html += '<tr>';
            html += '<td>';
            html += '<strong>Total Compra: </strong><span> ' + pedido.total + ' </span>';
            html += '</td>';
            html += '</tr>';

            if (codigoDescuento.aplicado == true) {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código </strong><span> ( ' + codigoDescuento.codigo + ' ): ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            } else {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código: </strong><span> ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            }

            html += '<tr style="text-align: center; font-size: 16px; background-color: #f31149;">';
            html += '<td style="border:1px solid #e8e6e6; padding: 5px; color: white;">';
            html += '<strong>Total a Pagar: </strong><span> ' + pedido.totalPagar + ' </span>';
            html += '</td>';
            html += '</tr>';

        } else {

            html += '<tr>';
            html += '<td>';
            html += '<strong>Total Compra: </strong><span> ' + pedido.total + ' </span>';
            html += '</td>';
            html += '</tr>';

            if (codigoDescuento.aplicado == true) {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código </strong><span> ( ' + codigoDescuento.codigo + ' ): ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            } else {
                html += '<tr>';
                html += '<td>';
                html += '<strong>Descuento x Código: </strong><span> ' + pedido.descuentoCodigo + '</span>';
                html += '</td>';
                html += '</tr>';
            }

            html += '<tr>';
            html += '<td>';
            html += '<strong>Costo de envío: </strong><span> ' + pedido.costoEnvio + ' </span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="text-align: center; font-size: 16px; background-color: #f31149;">';
            html += '<td style="border:1px solid #e8e6e6; padding: 5px; color: white;">';
            html += '<strong>Total a Pagar: </strong><span> ' + pedido.totalPagar + ' </span>';
            html += '</td>';
            html += '</tr>';

        }
    }

    html += '</table>';
    html += '</div>'
    html += '</td>';
    html += '</tr>';

    // Nota y referencia de Compra
    html += '<tr>';
    html += '<td>';
    html += '<div width="100%">';
    html += '<table style="font-family:arial; font-size: 14px; color:#707173; text-align: center;" align="center" width="95%">';

    html += '<tr>';
    html += '<td style="font-size: 18px; padding-bottom: 10px;">';
    html += '<strong><span>La referencia de su compra es: ' + id_pedido + ' </span></strong>';
    html += '</td>';
    html += '</tr>';


    if (tipoPedido == 1) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span>' + configuracion.txtBtnEnviarPedido1 + ' </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 2) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> El cliente ha seleccionado hacer el pago por medio de depósito o transferencia bancaría. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 3) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> El cliente realizará el pago al momento de su entrega. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 4) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> La compra ha sido por medio de Payphone. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 5) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> La compra ha sido enviada por medio de WhatsApp. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 6) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> La compra ha sido por medio de Data Fast. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    if (tipoPedido == 7) {
        html += '<tr>';
        html += '<td>';
        html += '<strong>Nota: <span> La compra ha sido por medio de PlacetoPay. </span></strong>';
        html += '</td>';
        html += '</tr>';
    }

    html += '</table>';
    html += '</div>'
    html += '</td>';
    html += '</tr>';

    // Sugrenecia y Contactos
    html += '<tr>';
    html += '<td>';
    html += '<div width="100%">';
    html += '<table style="font-family:arial; border:1px solid #e8e6e6; border-radius: 25px; font-size: 14px; color:#707173; text-align: center; margin-top: 10px; margin-bottom: 15px; padding: 5px;" align="center" width="95%">';

    html += '<tr>';
    html += '<td>';
    html += '<span> Si tienes alguna pregunta sobre tu compra, te recomendamos contactarte con un asesor del comercio. </span>';
    html += '</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>';
    html += '<span>';
    html += '<strong>E-mail: </strong>';
    html += '<a href="mailto:' + configuracion.correo_personal_api + '" target="_blank">' + configuracion.correo_personal_api + '</a>';
    html += '</span>';
    html += '</td>';
    html += '</tr>';


    html += '</table>';
    html += '</div>'
    html += '</td>';
    html += '</tr>';


    html += '</tbody>'

    html += '</table>';

    var email = {
        html: html,
        correo_api: configuracion.correo_api,
        password_correo_api: configuracion.password_correo_api,
        correo_personal_api: configuracion.correo_personal_api,
        correo_cliente: pedido.correo
    }

    await enviarPedidoCorreo(email);
}

export async function enviarPedidoCorreo(datosEmail: any) {
    const nodemailer = require("nodemailer");

    var mail = datosEmail.correo_api;
    var pass = datosEmail.password_correo_api;
    var mailEmpresa = datosEmail.correo_personal_api;
    var mailCliente = datosEmail.correo_cliente;
    var respuesta: any;

    let transporter = await nodemailer.createTransport(await {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: mail,
            pass: pass
        }
    });

    let info = await transporter.sendMail(
        {
            from: mail, // sender address
            to: [mailCliente, mail, ''], // list of receivers
            subject: "Notificación de compra", // Subject line
            text: "Hola !!!", // plain text body
            html: datosEmail.html // html body
        }, (err: any, info: any) => {
            if (err) {
                respuesta = {
                    message: 'Error al enviar correo',
                    data: err,
                    ok: false
                };
                console.log("Respuesta Correo", respuesta);
            }
            if (info) {
                respuesta = {
                    message: 'Se envio el correo',
                    // data: info,
                    ok: true
                };
                console.log("Respuesta Correo", respuesta);
            }
        });
}