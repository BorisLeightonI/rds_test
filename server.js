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
    const connection = require('./config');
    connection.query('use bookstore', (err, results, fields)=>{
        if(err) console.log(err.message);
        // console.log('results', results);
        console.log(fields);
    });
    connection.query('select * from autor', (err, results, fields)=>{
        if(err) console.log(err.message);
        console.log(fields);
    });
    res.status(200).json({message: 'ok'});
});

const server = app.listen(port, ()=>console.log('Servidor escuchando peticiones http en puerto', server.address()))