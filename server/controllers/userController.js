const mysql = require('mysql');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//view users
exports.view = (req, res) => {
    //connect to DB
    pool.getConnection((err, Connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + Connection.threadId)

        //use the connection
        Connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            // When done with the connection, release it
            Connection.release();

            if (!err) {
                res.render('index', { rows });
            } else {
                console.log(err)
            }

            console.log('The data from the user table: \n', rows);
        });
    });
}

exports.find = (req, res) => {
    //connect to DB
    pool.getConnection((err, Connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + Connection.threadId)

        let searchTerm = req.body.search;

        //use the connection
        Connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            Connection.release();

            if (!err) {
                res.render('index', { rows });
            } else {
                console.log(err)
            }

            console.log('The data from the user table: \n', rows);
        });
    });

}
exports.form = (req, res) => {
    res.render('add-user');
}