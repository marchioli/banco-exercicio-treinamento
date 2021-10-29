const mongoose = require('mongoose')
mongoose.Promise = global.Promise



let mongo = ' '

if (process.env.NODE_ENV == 'dev') {
    let { mongoURL } = require('../.env')

    mongo = mongoURL
    

}

if (process.env.NODE_ENV == 'prod') {
    mongo = process.env.mongoURL
       
}



module.exports = mongoose.connect(mongo,  { useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = 
    "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = 
    "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = 
    "'{VALUE}' não é válido para o atributo '{PATH}'."