const convict = require('convict');

var config = convict ({
    env: {
        doc: "the runtime environment",
        format: ["production", "staging", "development"],
        default: "development",
        env: "NODE_ENV"
    },    
    server: {
        hostName: {
            doc: "node server host name",
            format: "*",
            default: "localhost"
        },
        port: {
            doc: "node server port number",
            format: "port",
            default: 9090,
            env: "PORT",
            arg: "port"
        }
    },
    db: {
        connectionString: {
            doc: "database connection string",
            format: "*",
            default: "mongodb://localhost/carts"
        }
    },
    order: {
        url: {
            doc: "create order resource endpoint",
            format: "*",
            default: "http://localhost:9191/orders"
        }
    }
});

var env = config.get('env');
config.loadFile('config/' + env + '.json');

config.validate({allowed: 'strict'});
module.exports = config;