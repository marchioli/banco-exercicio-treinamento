const restful = require('node-restful')
const mongoose = restful.mongoose

const planosSchema = new mongoose.Schema({

    custoMensal: String,
    tipoCartao: String,
    tipoConta: String,
    rendaMinima: Number,

})
module.exports = restful.model('Planos', planosSchema)
