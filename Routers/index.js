const express = require('express');
const router = express.Router();

//metodo get da raiz
router.get('/', function (req, res) {
    return res.status(200).send({message: 'Conteudo restrito!'});
});

//metodo post da raiz
router.post('/', function (req, res) {
    return res.status(200).send({message: 'Tudo ok com o método POST da raiz!'});
});

module.exports = router;