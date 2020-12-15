import { createPool } from 'mysql2/promise';

export async function conect(){
    const conection = await createPool({
        host: '127.0.0.1',
        user: 'loxafree',
        password: 'loxafree.2019',
        database: 'WebVentasBilling'
    });
    return conection;
}