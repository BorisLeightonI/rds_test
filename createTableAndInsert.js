const connection = require("./config");





const createTodoTable = `create table if not exists todos(
    id int primary key auto_increment,
    title varchar(255) not null,
    completed tinyint(1) not null default 0,
    authors 
);`;

connection.query(createTodoTable, (err, results, fields)=>{
    if(err) return console.error(err.message);
});

// insert statment
let sql = `INSERT INTO todos(title,completed)
           VALUES('Learn how to insert a new row',true)`;

// execute the insert statment
connection.query(sql);


connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });