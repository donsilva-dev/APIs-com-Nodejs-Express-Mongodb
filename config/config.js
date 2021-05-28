const env =  process.env.NODE_ENV  || 'dev';


const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://usuario_admin:91525419@clusterapi.kjygh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: '#1q2w3e4R',
                jwt_expires_in: '7d'
            }

        case 'html':
            return {
                bd_string: 'mongodb+srv://usuario_admin:91525419@clusterapi.kjygh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: '#1q2w3e4R',
                jwt_expires_in: '7d'
            }

        case 'prod':
            return {
                bd_string: 'mongodb+srv://usuario_admin:91525419@clusterapi.kjygh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                jwt_pass: '#1q2w3e4R',
                jwt_expires_in: '7d'
            }

    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`)

module.exports = config()