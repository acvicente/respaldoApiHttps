export interface boton{
    id_boton?: string;
    id_empresa: string;
}

export interface pasarela{
    id_pasarela?: string;
    id_boton: string;
    nombre: string;	
    token : string;
    secret_key: string;
    url: string;
}