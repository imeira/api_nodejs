const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//FUNÇÕES AUXILIARES
const createUserToken = function (userId) {
    return jwt.sign({id: userId}, "batatafrita2019", {expiresIn: "7d"});
};


//usando async e await
router.get('/', async function (req, res) {
    try {
        const users = await Users.find({});
        return  res.status(200).send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários' });
    }
});

//metodo post da rota de usuarios
router.post('/', function (req, res) {
    return res.status(200).send({message: 'Tudo ok com o método POST da rota de usuarios!'});
});


//usando async e await
router.post('/create', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).send({ error: 'Dados insuficientes'});

    try {
        if (await Users.findOne({email})) res.status(404).send({ error: 'Usuario ja registrado ' + email });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});


//usando async e await
router.post('/auth', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).send({ error: 'Dados insuficientes'});

    try {
        const user = await Users.findOne({email}).select('password');
        if (!user) return res.status(404).send({ error: 'Usuario não registrado '});

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok)  return res.status(404).send({ error: 'Erro ao autenticar usuário ' + email });

        user.password = undefined;
        return res.status(200).send(user, createUserToken(user.id));
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário ' + email });
    }
});

module.exports = router;