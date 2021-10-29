
const errorHandler = require('../common/errorHandler')
const Planos = require('./Planos')
const moment = require('moment')
require('moment/locale/pt-br');
Planos.methods(['get', 'post', 'put', 'delete'])
Planos.updateOptions({ new: true, runValidators: true })
Planos.after('post', errorHandler).after('put', errorHandler)



Planos.route('planosDisponiveis.post', (req, res, next) => {

    const rendaMensal = req.body.rendaMensal

    Planos.find({
         rendaMinima: {$lte : rendaMensal} 
    },
        (error, value) => {
            if (error) {
                res.status(400).json({ errors: [error] })
            } else {
                res.status(200).json({ planos: value })
            }
        })
})



module.exports = Planos
