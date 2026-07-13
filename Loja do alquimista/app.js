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

        // Aqui fica tudo que queremos tentar fazer
        // Se qualquer linha aqui der erro, o catch captura

        await client.connect();
        const resultado = await client.query('SELECT * FROM itens');
        console.log(resultado.rows);

    } catch (erro) {

        // Se algo deu errado no try, cai aqui
        // O erro tem uma mensagem que nos diz o que aconteceu
        console.log('❌ Erro:', erro.message);

    } finally {

        // Isso SEMPRE executa — deu certo ou não
        // É aqui que fechamos a conexão com o banco
        await client.end();

    }
}