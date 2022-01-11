const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const { CLIENT_LONG_PASSWORD } = require("mysql/lib/protocol/constants/client");
const Connection = require("mysql/lib/Connection");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));

//templating engine
app.engine("hbs", exphbs.engine( {extname:".hbs" }));
app.set("view engine", "hbs");

//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//connect to DB
pool.getConnection((err, Connection) =>{
    if(err) throw err; //not connected
    console.log('Connected as ID' + Connection.threadId)
})

const routes = require('./server/routes/user')
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`))