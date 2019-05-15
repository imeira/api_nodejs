const express = require('express');
const router = express.Router();

//metodo get da raiz
router.get('/', function (req, res) {
    let obj = req.query;
    return res.send({message: 'Tudo ok com o método GET da raiz!'});
});

//metodo post da raiz
router.post('/', function (req, res) {
    return res.send({message: 'Tudo ok com o método POST da raiz!'});
});

module.exports = router;