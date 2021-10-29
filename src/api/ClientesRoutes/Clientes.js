const restful = require('node-restful')
const mongoose = restful.mongoose

const clientesSchema = new mongoose.Schema({

    nomeCompleto: String,
    email: String,
    senha: String,
    cpf: String,
    dataNascimento: String,
    dataCadastro: String,
    salarioMensal: String,
    endereco: {
        cep: String,
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String
    },
    plano: {
        custoMensal: String,
        tipoCartao: String,
        tipoConta: String
    },
    numeroCelular: String,
    urlImagem: String,
    status: Number

})
module.exports = restful.model('Clientes', clientesSchema)
