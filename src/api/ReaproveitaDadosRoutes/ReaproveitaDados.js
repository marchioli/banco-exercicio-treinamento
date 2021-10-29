const restful = require('node-restful')
const mongoose = restful.mongoose

const reaproveitaSchema = new mongoose.Schema({

    nomeCompleto: String,
    email: String,
    senha: String,
    cpf: String,
    dataNascimento: String,
    dataCadastro: String,
    endereco: {
        cep: String,
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String
    },
    numeroCelular: String,
    status: Number

})
module.exports = restful.model('ReaproveitaDados', reaproveitaSchema)
