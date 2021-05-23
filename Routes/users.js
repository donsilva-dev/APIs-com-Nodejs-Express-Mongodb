const express = require('express');
const router = express.Router();
const Users = require('../model/user')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: 'Error na consulta de usuarios!'})
        return res.send(data)
    });

});

router.post('/create', (req, res) => {

    const { cpf, email, password, id } = req.body;

    if(!email || !password) return res.send({ error: ' Dados insuficientes!'})
    if(!cpf) return res.send({ error: 'Obrigatorio REGISTRAR CPF'})

    Users.findOne({cpf}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao buscar usuário'})
        if(data) return res.send({ error: 'Usuário já registrado'})

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário'})
            data.password = undefined
            return res.send(data)
        })
    })
})

router.post('/auth', (req, res) => {
    const { cpf, email, password, id } = req.body;

    if( !cpf || !email || !password) return res.send({ error: ' Dados insuficientes!'})
    
    Users.findOne({cpf}, (err, data) => {
        if(err) return res.send( { error: 'Error ao buscar usuario'})
        if(!data) return res.send({error: 'Usuario nao registardo'})

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({ error: 'Error ao authenticar usuario'})

            data.password = undefined

            return res.send(data)
        })

    }).select('+password')

})

module.exports = router