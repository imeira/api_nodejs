const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

//metodo get da rota de usuarios
/*router.get('/', function (req, res) {
    Users.find({}, function(err, data) {
        if (err) return res.send({ error: 'Erro na consulta de usuários' });
        return res.send(data);
    });
});*/
//usando async e await
router.get('/', async function (req, res) {
    try {
        const users = await Users.find({});
        return  res.send(users);
    }
    catch (err) {
        return res.send({ error: 'Erro na consulta de usuários' });
    }
});

//metodo post da rota de usuarios
router.post('/', function (req, res) {
    return res.send({message: 'Tudo ok com o método POST da rota de usuarios!'});
});

/*router.post('/create', function (req, res) {
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

});*/
//usando async e await
router.post('/create', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes'});

    try {
        if (await Users.findOne({email})) res.send({ error: 'Usuario ja registrado ' + email });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }
});

/*router.post('/auth', function (req, res) {
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

});*/
//usando async e await
router.post('/auth', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes'});

    try {
        const user = await Users.findOne({email}).select('password');
        if (!user) return res.send({ error: 'Usuario não registrado '});

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok)  return res.send({ error: 'Erro ao autenticar usuário ' + email });

        user.password = undefined;
        return res.send(user);
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário ' + email });
    }
});

module.exports = router;