const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data)
    return res.send({message: 'Essa informação é muito importante. Usuários não poderiam recebê-la.'})
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo POST da RAIZ'})
})

module.exports = router

