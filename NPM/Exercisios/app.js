const mysql = require("mysql2/promise");

async function main() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "SUA_SENHA",
      database: "escola_db",
    });

    const [countRows] = await connection.execute(
      "SELECT COUNT(*) AS total FROM alunos"
    );

    console.log(`Total de alunos: ${countRows[0].total}`);

    const [avgRows] = await connection.execute(
      "SELECT AVG(nota) AS media FROM alunos"
    );

    console.log(`Média geral da turma: ${Number(avgRows[0].media).toFixed(2)}`);
  } catch (error) {
    console.error("Erro:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();