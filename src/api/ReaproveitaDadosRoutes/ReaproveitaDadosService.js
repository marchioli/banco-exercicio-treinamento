
const errorHandler = require('../common/errorHandler')
const ReaproveitaDados = require('./ReaproveitaDados')
const moment = require('moment')
require('moment/locale/pt-br');
ReaproveitaDados.methods(['get', 'post', 'put', 'delete'])
ReaproveitaDados.updateOptions({ new: true, runValidators: true })
ReaproveitaDados.after('post', errorHandler).after('put', errorHandler)



ReaproveitaDados.route('buscarCPF.post', (req, res, next) => {

    const cpf = req.body.cpf

    ReaproveitaDados.find({
        cpf
    },
        (error, value) => {
            if (error) {
                res.status(400).json({ errors: [error] })
            } else {
                res.status(200).json({ cliente: value[0] })
            }
        })
})



module.exports = ReaproveitaDados
