const { createTables } = require('./createTablesSqlStatements.js');


let jsonFile = 0;
const p1 = new Promise((resolve, reject)=>{
    resolve(require('./testing_fetch_data.js'))
})
const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(require('./dataset.json'))
    }, 2000)
})
// const jsonFile = require('dataset.json');
// console.log(jsonFile);
const libros = [];
let row = [];
const autoresSet = new Set();
const categoriasSet = new Set();


Promise.all([p1, p2]).then(values => {
    console.log(values[0])
    return values[1]
})
.then(json=>{
    // console.log(json[0]);
    // console.log(json[0].publishedDate['$date']);
 let element = 0;

    for (let i = 0; i < 2; i++) {
        
        for (const key in json[i]) {
            if (Object.hasOwnProperty.call(json[i], key)) {
                element = json[i][key];
    
                if(key==='publishedDate') element = json[i][key]['$date'];
                if((key!='authors')&&(key!='categories')) {
                    // console.log('KEY',key);
                    row.push(element);
                }
    
                if(key==='authors') {
                    json[i][key].map(e => autoresSet.add(e))
                    continue;
                }
                if(key==='categories') {
                    json[i][key].map(e => categoriasSet.add(e))
                    continue;
                }
            }
        }        
        libros.push(row);
        row = [];        
    }

    return {libros, autores:Array.from(autoresSet).map(e => [e]), categorias:Array.from(categoriasSet).map(e => [e])};
}).then(({libros, autores, categorias}) => {
    // console.log(libros);
    console.log(autores);
    console.log(categorias);

    const connection = require("./config");
    const { dropTables } = require('./dropTablesSqlStatements.js');
    
    connection.query(dropTables, (err, results, fields)=>{
        if(err) console.error(err.message);
        console.log(results);
    })
    
      createTables.map(createTable => connection.query(createTable, 
        (err, results, fields)=>{
        if(err) return console.error(err.message);
    }));
    
    // insert statment
    let insertSql = `INSERT INTO 
    libro(id_libro,titulo, isbn, paginas, fechaPublicacion, imagen, descripcionCorta, descripcionLarga, status) 
    VALUES ?`;
    
    // execute the insert statment
    connection.query(insertSql, [libros], (err, results, fields) => {
        if (err) return console.error(err.message);
        // get inserted rows
        console.log('Row inserted:' + results.affectedRows);
      });
    
    insertSql = `INSERT INTO autor(nombre) VALUES ?`;
    connection.query(insertSql, [autores], (err, results, fields) => {
        if (err) return console.error(err.message);
        // get inserted rows
        console.log('Row inserted:' + results.affectedRows);
      });
    insertSql = `INSERT INTO categoria (nombre) VALUES ?`;
    connection.query(insertSql, [categorias], (err, results, fields) => {
        if (err) return console.error(err.message);
        // get inserted rows
        console.log('Row inserted:' + results.affectedRows);
      });
    
    connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
      });
})

