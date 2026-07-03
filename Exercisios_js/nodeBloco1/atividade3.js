function Nome(nome) {
    if (nome.length >= 3) {
        return nome;
    } else {
        return "Sem nome";
    }
}

function Idade(idade) {
    if (idade >= 18) {
        return "Maior de idade";
    } else {
        return "Menor de idade";}
}
module.exports = {
    Nome,
    Idade
};