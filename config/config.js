const env = process.env.NODE_ENV || 'dev';

//String de conexao mongodb clever
//const url = 'mongodb://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@byrstsldzt0y1tg-mongodb.services.clever-cloud.com:27017/byrstsldzt0y1tg';

//String de conexao mongodb altas
//const url = 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@clusterapi-dnmpn.gcp.mongodb.net/test?retryWrites=true';
//const url = 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@cluster0-dnmpn.mongodb.net/test?retryWrites=true';

//mongostat --host Cluster0-shard-0/cluster0-shard-00-00-dnmpn.mongodb.net:27017,cluster0-shard-00-01-dnmpn.mongodb.net:27017,cluster0-shard-00-02-dnmpn.mongodb.net:27017 --ssl --username uswjde3iz596yngjuy9r --password pKpwswJcCtAGlfuZrnv0 --authenticationDatabase admin


const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@cluster0-dnmpn.mongodb.net/test?retryWrites=true',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }

        case 'hml':
            return {
                bd_string: 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@cluster0-dnmpn.mongodb.net/test?retryWrites=true',
                jwt_pass: 'batatafrita2019',
                jwt_expires_in: '7d'
            }

        case 'prod':
            return {
                bd_string: 'mongodb+srv://uswjde3iz596yngjuy9r:pKpwswJcCtAGlfuZrnv0@cluster0-dnmpn.mongodb.net/test?retryWrites=true',
                jwt_pass: 'jfasdofjiof342342kjki4$@#$@#dsakdfsaf',
                jwt_expires_in: '7d'
            }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();