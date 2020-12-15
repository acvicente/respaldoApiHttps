export interface Pedido{
    id_pedido?: string;
    id_empresa: string;
    nombres: string;
    cedula_cliente : string;	
    direccion_cliente : string;
    fecha_pedido: string;
    total: Float32Array;
    estado: string;
    observaciones: string;
    apellidos: string;
    correo: string;
    telefono: string;
    estado_transaccion:string;
    pasarela_pago: string,
    id_transaccion:string;
}

export interface notificacionPlacetopay {
    status: {
        status: string,
        message: string,
        reason: string,
        date: string
    },
    requestId: number,
    reference: string,
    signature: string
}