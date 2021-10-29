const express = require('express')
const HandleFiles = require('./../api/common/HandleFiles')


module.exports = function (server) {

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/api', openApi)

    const ReaproveitaDados = require('../api/ReaproveitaDadosRoutes/ReaproveitaDadosService')

    ReaproveitaDados.register(openApi, '/ReaproveitaDados')

    const Clientes = require('../api/ClientesRoutes/ClientesService')

    Clientes.register(openApi, '/Clientes')

    const Planos = require('../api/PlanosRoutes/PlanosService')

    Planos.register(openApi, '/Planos')

    openApi.post('/uploadImage', HandleFiles.uploadImageStream)


   // protectedApi.post('/getUser', userFirebase.getUser)


 
}