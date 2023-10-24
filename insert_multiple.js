let mysql = require('mysql');
const connection = require('./config');


// insert statment
let stmt = `INSERT INTO todos(title,completed)  VALUES ?  `;
let todos = [
  ['Insert multiple rows at a time', false],
  ['It should work perfectly', true]
];

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});

// close the database connection
connection.end();
