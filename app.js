const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//String de conexao mongodb clever
//const url = 'mongodb://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@byrstsldzt0y1tg-mongodb.services.clever-cloud.com:27017/byrstsldzt0y1tg';

//String de conexao mongodb altas
//const url = 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@clusterapi-dnmpn.gcp.mongodb.net/test?retryWrites=true';
const url = 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@cluster0-dnmpn.mongodb.net/test?retryWrites=true';

//mongostat --host Cluster0-shard-0/cluster0-shard-00-00-dnmpn.mongodb.net:27017,cluster0-shard-00-01-dnmpn.mongodb.net:27017,cluster0-shard-00-02-dnmpn.mongodb.net:27017 --ssl --username uswjde3iz596yngjuy9r --password pKpwswJcCtAGlfuZrnv0 --authenticationDatabase admin

const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser:true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', function (err) {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Aplicação desconectada do banco de dados!');
});

mongoose.connection.on('connected', function () {
    console.log('Aplicação conectada ao banco de dados!');
});

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const indexRoute = require('./Routers/index.js');
const userRoute = require('./Routers/users.js');

app.use('/', indexRoute);
app.use('/users', userRoute);

//porta que a app vai ficar startada
app.listen(3000);

module.exports = app;
