import chalk from 'chalk';
import sillyName from 'sillyname';
import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log(chalk.green("Mensagem colorida"));
console.log(chalk.red("Erro!"));

console.log(chalk.bgRedBright("Tuff"));

const nome = sillyName();

console.log("Nome Aleatório", nome);

console.log(chalk.green("Olá!"));

console.log(chalk.blue(sillyName()));
console.log(nome);

const nome2 = prompt("Qual seu nome? ");

console.log("Olá", nome2);

console.log(chalk.bgBlueBright(`Olá ${nome2}, seu nome agora é ${sillyName()}`));