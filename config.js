require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-2.cp5ykmwaxgag.sa-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: process.env.MYSQL_PASSWORD,
    // database: 'todoapp',
});

connection.connect(err=>{
    if(err) return console.error('error:', err.message);
    console.log('Connected to MySQL server');
});

connection.query('drop database if exists bookstore', (err, results, fields)=>{
    if(err) console.log(err.message);
    console.log('results', results);
});
connection.query('create database if not exists bookstore', (err, results, fields)=>{
    if(err) console.log(err.message);
    console.log('results', results);
});
connection.query('use bookstore', (err, results, fields)=>{
    if(err) console.log(err.message);
    console.log('results', results);
});

module.exports = connection;