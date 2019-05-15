const express = require('express');
const router = express.Router();
const Users = require('../model/user');
//const bcrypt = require('bcrypt');
const bcrypt = '123456';//temporario ate conseguir executar o npm install bcrypt sem erro

//metodo get da rota de usuarios
router.get('/', function (req, res) {
    Users.find({}, function(err, data) {
        if (err) return res.send({ error: 'Erro na consulta de usuários' });
        return res.send(data);
    });
});

//metodo post da rota de usuarios
router.post('/', function (req, res) {
    return res.send({message: 'Tudo ok com o método POST da rota de usuarios!'});
});

router.post('/create', function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes'});

    Users.findOne({email}, function (err, data) {
        if (err) return res.send({ error: 'Erro ao buscar usuário ' + email });
        if (data) return res.send({ error: 'Usuario ja registrado ' + email });

        Users.create({ email, password}, function (err, data) {
            if (err) return res.send({ error: 'Erro ao criar usuário ' + email });

            data.password = undefined;
            return res.send(data);
        });
    });

});


router.post('/auth', function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes'});

    Users.findOne({email}, function (err, data) {
        if (err) return res.send({ error: 'Erro ao buscar usuário ' + email });
        if (!data) return res.send({ error: 'Usuario não registrado ' + email });

        bcrypt.compare(password, data.password, function (err, same) {
           if (!same) return res.send({ error: 'Usuario não registrado '});

            data.password = undefined;
            return res.send(data);
        });

    }).select('password');

});

module.exports = router;