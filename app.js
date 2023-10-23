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

const createTodoTable = `create table if not exists todos(
    id int primary key auto_increment,
    title varchar(255) not null,
    completed tinyint(1) not null default 0
);`;
connection.query(createTodoTable, (err, results, fields)=>{
    if(err) return console.error(err.message);
});


connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });