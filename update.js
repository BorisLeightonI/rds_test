const connection = require("./config");

// update statment
let sql = `UPDATE todos
           SET completed = ?
           WHERE id = ?`;

let data = [false, 1];

// execute the UPDATE statement
connection.query(sql, data, (error, results, fields) => {
  if (error){
    return console.error(error.message);
  }
  console.log('Rows affected:', results.affectedRows);
});

connection.end();
/**
 * In this example, we used placeholders (?) in the UPDATE statement.

When we executed the UPDATE statement by calling the query() method on the connection object, we passed the data to the UPDATE statement in the form of an array. The placeholders will be substituted by the values in the data array in the order. In this example, completed will be set to false, and id will be set to 1.

The results argument of the callback function has the affectedRows property that returns the number of rows updated by the UPDATE statement.
 */
