const express = require('express');
const router = express.Router();
const Users = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//FUNCOES AUXILIAREIS

const creatUserToken = (userId) => {
    return jwt.sign({ id: userId}, config.jwt_pass, { expiresIn: config.jwt_expires_in});
}

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.status(500).send({ error: 'Error na consulta de usuarios!'})
        return res.send(data)
    });

});

router.post('/create', (req, res) => {

    const { cpf, email, password, id } = req.body;

    if(!email || !password) return res.status(400).send({ error: ' Dados insuficientes!'})
    if(!cpf) return res.send({ error: 'Obrigatorio REGISTRAR CPF'})

    Users.findOne({cpf}, (err, data) => {
        if(err) return res.status(500).send({ error: 'Erro ao buscar usuário'})
        if(data) return res.send({ error: 'Usuário já registrado'})

        Users.create(req.body, (err, data) => {
            if (err) return res.status(500).send({ error: 'Erro ao criar usuário'})
            data.password = undefined
            return res.status(201).send({data, token: creatUserToken(data.id)})
        })
    })
})

router.post('/auth', (req, res) => {
    const { cpf, email, password, id } = req.body;

    if( !cpf || !email || !password) return res.status(400).send({ error: ' Dados insuficientes!'})
    
    Users.findOne({cpf}, (err, data) => {
        if(err) return res.send( { error: 'Error ao buscar usuario'})
        if(!data) return res.status(400).send({error: 'Usuario nao registardo'})

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.status(401).send({ error: 'Error ao authenticar usuario'})

            data.password = undefined

            return res.send({data, token: creatUserToken(data.id)})
        })

    }).select('+password')

})

module.exports = router

/*

200 - ok
201 - Create
202 - Accepted

400 - Bad request
401 - Unauthorized -- Autenticação, tem caráter temporário.
403 - Forbidden -- Autorização,  tem carter permanente
404- Not Fund.

500 - Internal server Error
501 - Not implemented - a APi não suporta essa funcionalidade
503 - Service Unavailable -  API executa essa operação, mas no momento está indisponivel.


*/