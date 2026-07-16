import pkg from "pg";
import readline from "readline";

const { Client } = pkg;

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "escola_db"
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function cadastrarAluno() {
    try {
        await client.connect();

        const nome = await perguntar("Nome: ");
        const turma = await perguntar("Turma: ");
        const nota = Number(await perguntar("Nota: "));

        const resultado = await client.query(
            `INSERT INTO alunos (nome, turma, nota)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, turma, nota]
        );

        console.log("Aluno cadastrado com sucesso!");
        console.table(resultado.rows);

    } catch (erro) {
        console.log("Erro ao inserir:", erro.message);

    } finally {
        rl.close();
        await client.end();
    }
}

cadastrarAluno();