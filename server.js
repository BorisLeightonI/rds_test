// require('./testing_run_fetch_file');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const takeAndSendFile = require('./utils/takeFile');
const path = require('node:path');

require('./testing_fetch_file');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

// app.get('/', (req, res)=>{
//     const {min, max} = req.query;
//     console.log('min', min, 'max', max);
//     const connection = require('./config');
//     let autores = 0;
//     let categorias = 0;
//     let libros = 0;
    
//     connection.query('use bookstore', (err, results, fields)=>{
//         if(err) console.log(err.message);
//         // console.log('results', results);
//         console.log(fields);
//     });
//     connection.query(`select * from autor where id_autor >= 1;`, (err, results, fields)=>{
//         if(err) console.log(err.message);
//         console.log(results);
//         autores = results.map(result => ({...result}));
//     });
//     connection.query(`select * from categoria where id_categoria >= ? and id_categoria <= ?;`, [min, max], (err, results, fields)=>{
//         if(err) console.log(err.message);
//         categorias = results.map(result => ({...result}));
//     });
//     connection.query(`select * from libro where id_libro >= ? and id_libro <= ?;`, [min, max], (err, results, fields)=>{
//         if(err) console.log(err.message);
//         libros = results.map(result => ({...result}));
//         res.status(200).json({message: 'ok', libros, categorias, autores});
//     });
    
// });

app.post('/process-image', takeAndSendFile,(req, res)=>{
    res.status(200).json({message: 'ok'})
});

app.post('/process-img-url', (req, res)=> {
    console.log(req.body);

    const options = {
        root: path.join(__dirname)
    };
 
    const fileName = 'tempFile.jpg';
    try {
        res.sendFile(fileName, options, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('Sent:', fileName);
            }
        });
        
    } catch (error) {
        res.status(400).json({error})
    }
})

const server = app.listen(port, ()=>console.log('Servidor escuchando peticiones http en puerto', server.address()))