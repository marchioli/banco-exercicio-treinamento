
const errorHandler = require('../common/errorHandler')
const Clientes = require('./Clientes')
const moment = require('moment')
require('moment/locale/pt-br');
Clientes.methods(['get', 'post', 'put', 'delete'])
Clientes.updateOptions({ new: true, runValidators: true })
Clientes.after('post', errorHandler).after('put', errorHandler)


Clientes.route('buscarDados.post', (req, res, next) => {

    const cpf = req.body.cpf

    Clientes.find({
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


Clientes.route('alterarPlano.post', (req, res, next) => {
    (async function () {

        const cpf = req.body.cpf
        const plano = req.body.plano
   
        Clientes.findOneAndUpdate({
            cpf
        }, { '$set': { plano: plano } }, {
            new: true, useFindAndModify: false
        },
            (error, value) => {
                if (error) {
                    res.status(400).json({ errors: [error] })
                } else {
                    res.status(200).json({ cliente: value })
                }
            })

    })()

})


Clientes.route('alterarImagem.post', (req, res, next) => {
    (async function () {

        const cpf = req.body.cpf
        const urlImagem = req.body.urlImagem
   
        Clientes.findOneAndUpdate({
            cpf
        }, { '$set': { urlImagem: urlImagem } }, {
            new: true, useFindAndModify: false
        },
            (error, value) => {
                if (error) {
                    res.status(400).json({ errors: [error] })
                } else {
                    res.status(200).json({ cliente: value })
                }
            })

    })()

})

Clientes.route('pegarEstoqueParam.post', (req, res, next) => {
    (async function () {

        const _id = req.body._id
        const param = req.body.param

        let datatostate = []

        try {
            let encaminhados = await Clientes.find({
                $and: [
                    { status_item: 5 },
                    { DATAMOVTO: { $gte: param == null ? null : moment(param).startOf('day') } }
                ]
            })
            .sort({ 'DATAMOVTO': 'desc' })
            .exec()

            if (encaminhados.length != 0) {

                datatostate.push({ header: `Alertas em observação (${encaminhados.length})`, _id: 5 })


                for (let j in encaminhados) {

                    datatostate.push(encaminhados[j])

                }

            }
        }
        catch (e) { console.log(e) }


        try {
            let abertos = await Clientes.find({
                $and: [
                    { status_item: 0 },
                    { DATAMOVTO: { $gte: param == null ? null : moment(param).startOf('day') } }
                ]
            })
            .sort({ 'DATAMOVTO': 'desc' })
            .exec()

            if (abertos.length != 0) {
                datatostate.push({ header: `Alertas abertos (${abertos.length})`, _id: 0 })

                for (let j in abertos) {
                    datatostate.push(abertos[j])
                }

            }
        }
        catch (e) { console.log(e) }

        

        try {
            let esquecidos = await Clientes.find({
                $and: [
                    { status_item: 10 },
                    { DATAMOVTO: { $gte: param == null ? null : moment(param).startOf('day') } }
                ]
            })
            .sort({ 'DATAMOVTO': 'desc' })
            .exec()

            if (esquecidos.length != 0) {

                datatostate.push({ header: `Alertas ignorados (${esquecidos.length})`, _id: 10 })


                for (let j in esquecidos) {

                    datatostate.push(esquecidos[j])

                }

            }
        }
        catch (e) { console.log(e) }


        if (datatostate.length == 0) {

            datatostate.push({ header: 'Sem alertas no momento', _id: 999 })
        }

        res.json({ value: datatostate })

    })()

})


Clientes.route('estoque.post', (req, res, next) => {

    const _id = req.body._id
    Clientes.findById(
        {
            _id
        }
        ,
        (error, value) => {
            if (error) {
                console.log(error)
                res.status(400).json({ errors: [error] })
            } else {
                res.json({ value })
            }
        })
})


Clientes.route('esquecerEstoque.post', (req, res, next) => {
    const _id = req.body._id


})


Clientes.route('takeMyEstoque.post', (req, res, next) => {

    const idEstoquedor = req.body._id

    Clientes.find({
        idEstoquedor
    },
        (error, value) => {
            if (error) {
                res.status(400).json({ errors: [error] })
            } else {
                res.status(200).json({ value })
            }
        })
})


Clientes.route('update.post', (req, res, next) => {

    const _id = req.body._id

    Clientes.findById({ _id }, async function (err, orc) {

        if (err || orc == null) {
            res.status(400).json({ errors: ['Orçamento não encontrado.'] })
        }
        else {


            if (orc.status > 0) {
                res.status(400).json({ errors: ['Orçamento já aprovado/reprovado, não é possivel modifica-lo.'] })

            }

            else {


                let Estoque = req.body

                delete Estoque.idCliente
                delete Estoque.nomeCliente
                delete Estoque.cpfCliente
                delete Estoque.status
                delete Estoque.idUser
                delete Estoque.nomeUser
                delete Estoque.dateCreated

                Clientes.findOneAndUpdate({
                    _id
                }, { ...Estoque }, {
                    new: true, useFindAndModify: false
                },
                    (error, value) => {
                        if (error) {
                            res.status(400).json({ errors: [error] })
                        } else {
                            res.status(200).json({ value })
                        }
                    })

            }

        }
    });

})



Clientes.route('searchEstoque.post', (req, res, next) => {

    const searchString = req.body.searchString

    Clientes.find({

        $or: [

            {
                'nomeCliente': { '$regex': searchString, '$options': 'i' }
            },
            {

                'cpfCliente': { '$regex': searchString, '$options': 'i' }
            }

        ]

    },

        async (error, value) => {
            if (error) {
                res.status(400).json({ errors: [error] })
            } else {

                let result = []

                for (let key in value) {

                    console.log('id orc', value[key]._id)

                    if (value[key].temp) {
                        result.push({ ...value[key].toObject() })
                    }

                    else {
                        const clienteData = await getCliente(value[key].idCliente)


                        // console.log('cliente', clienteData)
                        let cliente = clienteData.toObject()
                        delete cliente._id
                        console.log(cliente)
                        //value[key].clienteData = clienteData
                        result.push({ ...value[key].toObject(), ...cliente })
                    }






                }

                console.log('result')
                res.json({ value: result })
            }
        })
        .sort({ 'dateCreated': 'desc' })
})


const getCliente = function (id) {

    return new Promise(resolve => {
        Clientes.findById({ _id: id }, function (err, user) {
            resolve(user)
        });

    });

}
const getOrc = function (_id) {
    return new Promise(resolve => {
        Clientes.findById({ _id }, function (err, orc) {
            if (err || orc == null) {

                resolve({ error: 'Orçamento não encontrado.' })
                console.log('foi erro', err)

            }

            else {

                console.log('foi', orc)

                resolve(orc)

            }
        });
    });

}


module.exports = Clientes
// 'nomeSistema': { '$regex': VENDEDOR, '$options': 'i' }