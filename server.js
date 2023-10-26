require('./testing_run_fetch_file');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res)=>{
    const {min, max} = req.query;
    const connection = require('./config');
    let autores = 0;
    let categorias = 0;
    let libros = 0;
    
    connection.query('use bookstore', (err, results, fields)=>{
        if(err) console.log(err.message);
        // console.log('results', results);
        console.log(fields);
    });
    connection.query(`select * from autor where id_autor between ? and ?;`, [min, max], (err, results, fields)=>{
        if(err) console.log(err.message);
        autores = results.map(result => ({...result}));
    });
    connection.query(`select * from categoria where id_categoria between ? and ?;`, [min, max], (err, results, fields)=>{
        if(err) console.log(err.message);
        categorias = results.map(result => ({...result}));
    });
    connection.query(`select * from libro where id_libro between ? and ?;`, [min, max], (err, results, fields)=>{
        if(err) console.log(err.message);
        libros = results.map(result => ({...result}));
    });
    res.status(200).json({message: 'ok', libros, categorias, autores});
});

const server = app.listen(port, ()=>console.log('Servidor escuchando peticiones http en puerto', server.address()))