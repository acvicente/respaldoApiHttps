
export interface pedidoEmpresa{
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
}