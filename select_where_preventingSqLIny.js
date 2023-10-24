const connection = require("./config");
/**
 * Ejecutar con un argumento: node file.js 1
 */

let id = process.argv[2]; // pass argument to query
let sql = `SELECT * FROM todos WHERE id=` + id ;
/**
 * It works correctly. However, there is one issue that a suspicious user may exploit the program by passing the SQL code in the argument.

To prevent this SQL injection, you need to either use the placeholder (?) as in the previous example or use the escape() method of the mysql or connection object as follows:
 */
sql = `SELECT * FROM todos WHERE id = ` + mysql.escape(id);

connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end();
