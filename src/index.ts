import { App } from './app';

async function main(){
    const app  = new App(8444);
    await app.listen();
}

main();