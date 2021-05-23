const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo GET da RAIZ'})
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo POST da RAIZ'})
})

module.exports = router

