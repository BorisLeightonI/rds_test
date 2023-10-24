require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-2.cp5ykmwaxgag.sa-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: process.env.MYSQL_PASSWORD,
    database: 'todoapp',
});

connection.connect(err=>{
    if(err) return console.error('error:', err.message);
    console.log('Connected to MySQL server');
})

module.exports = connection;