// FileName: index.js
// Import express
let express = require('express');
// Initialize the app
let app = express();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const config = require('./config.js');
//console.log(config.get('db.connectionString'));

app.use(bodyParser.urlencoded({extended:true}));

//mongoose.connect('mongodb://localhost/carts');
mongoose.connect(config.get('db.connectionString'));

var db = mongoose.connection;

//import routes
let apiRoutes = require('./routes')
app.use('/api', apiRoutes);

// Setup server port
//var port = process.env.PORT || 9191;
var port = config.get('server.port')

// Send message for default URL
app.get('/', (req, res) => res.send('Carts API'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("running carts api on " + port);
});