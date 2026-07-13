const{ Client } = require('pg');
const prompt = require('prompt-sync')();

const client = new Client({
    host:     'localhost',  
    port:     5432,         
    user:     'postgres',   
    password: 'root',  
    database: 'alquimista_db' 
});
async function minhaFuncao() {

    try {


        await client.connect();
        const resultado = await client.query('SELECT * FROM itens');
        console.log(resultado.rows);

    } catch (erro) {

        console.log('❌ Erro:', erro.message);

    } finally {

        await client.end();

    }
}