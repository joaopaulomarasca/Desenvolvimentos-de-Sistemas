import pg from 'pg';
const { Client } = pg;
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'alquimista_db'
});

async function listarItens() {

    try {

        await client.connect();

        const resultado = await client.query(
            'SELECT * FROM itens ORDER BY tipo, nome'
        );

        console.log(resultado.rows);

    } catch (erro) {

        console.log('❌ Erro ao listar itens:', erro.message);

    } finally {
        await client.end();

    }
}

async function cadastrarItem() {

    try {

        // ❌ Mesmo problema
        await client.connect();

        console.log('\n⚗️ CADASTRAR NOVO ITEM\n');

        const nome      = prompt('Nome do item: ');
        const tipo      = prompt('Tipo: ');
        const preco     = prompt('Preço: ');
        const estoque   = prompt('Estoque: ');
        const descricao = prompt('Descrição: ');

        if (!nome || !tipo || !preco) {
            console.log('Campos obrigatórios.');
            return;
        }

        const resultado = await client.query(
            `INSERT INTO itens (nome, tipo, preco, estoque, descricao)
             VALUES ($1,$2,$3,$4,$5)
             RETURNING *`,
            [nome, tipo, preco, estoque, descricao]
        );

        console.log(resultado.rows[0]);

    } catch (erro) {

        console.log('❌ Erro:', erro.message);

    } finally {

        await client.end();

    }
}

async function removerItem() {

    try {

        await client.connect();

        const lista = await client.query(
            'SELECT id,nome,tipo FROM itens'
        );

        lista.rows.forEach(item => {
            console.log(item);
        });

        const id = prompt('ID: ');

        const busca = await client.query(
            'SELECT nome FROM itens WHERE id=$1',
            [id]
        );

        if (busca.rows.length == 0) {
            console.log('Não encontrado');
            return;
        }
        const confirmacao = prompt('Confirma? (s/n)');

        if (confirmacao.toLowerCase() != 's') {
            return;
        }

        await client.query(
            'DELETE FROM itens WHERE id=$1',
            [id]
        );

    } catch (erro) {

        console.log(erro.message);

    } finally {

        await client.end();

    }
}

async function menu() {

    let rodando = true;

    while (rodando) {

        console.log('1 - Listar');
        console.log('2 - Cadastrar');
        console.log('3 - Atualizar');
        console.log('4 - Remover');
        console.log('0 - Sair');

        // ❌ prompt não existe
        const opcao = prompt('Opção: ');

        switch (opcao) {

            case '1':
                await listarItens();
                break;

            case '2':
                await cadastrarItem();
                break;

            case '3':
                await atualizarEstoque();
                break;

            case '4':
                await removerItem();
                break;

            case '0':
                rodando = false;
                break;

            default:
                console.log('Opção inválida');
        }
    }
}

menu();
listarItens();