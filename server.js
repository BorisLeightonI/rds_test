// require('./testing_run_fetch_file');
const fs = require('node:fs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const takeAndSendFile = require('./utils/takeFile');
const path = require('node:path');
const fetching = require('./testing_fetch_file');
const runPython = require('./utils/run_python');
const AnalizadorFisuras = require('./utils/run_AnalizadorFisuras');

let carpetaDestinoImagenes = '';


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('inspecciones'));
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
app.get('/inspecciones/all', (req, res)=>{
    if(fs.existsSync('./inspecciones/inspecciones.json')){

        res.status(200).json({message: 'Archivo existe', data: require('./inspecciones/inspecciones.json')})
    }else{
        res.status(400).json({message: 'Archivo No existe'})
    }
});
app.post('/process-images', takeAndSendFile, /* runPython, */(req, res)=>{
    // const { scores } = req.body;
    res.status(200).json({message: 'Imagenes recibidas, almacenadas y analizadas' })
});
app.post('/new-inspection', (req, res) => {
    const { fecha, patente } = req.body;
    const date = new Date(fecha);
    const carpetaBase = './inspecciones'; 
    const archivoJson = carpetaBase + '/inspecciones.json';
    const carpeta = `${carpetaBase}/${patente}-${date.toLocaleString().replaceAll(':','_')}`;
    console.log('carpeta a crear: ',carpeta);
    carpetaDestinoImagenes = carpeta;

    if(fecha&&patente&&!fs.existsSync(carpetaBase)){
        fs.mkdir(carpetaBase, (err)=>{
            if(!err) {
                console.log('Nueva Carpeta Creada: '+ carpetaBase);
                const inspeccionesFile = fs.createWriteStream(carpetaBase+'/inspecciones.json');
                inspeccionesFile.write('[');
                inspeccionesFile.write(JSON.stringify(req.body));
                inspeccionesFile.write(']');
                inspeccionesFile.close();

                fs.mkdir(carpeta, {recursive: true}, (err)=>{ //Se crea la carpeta interior
                    if(!err) console.log('Se crea carpeta interior');
                });
                
                return res.status(200).json({message: 'Información recibida, se crea Archivo y carpeta'+fecha+'-'+patente });
                
            }
        });
    } else if(fecha&&patente&&fs.existsSync(carpetaBase)) { //Ya existe la carpeta

        if(fs.existsSync(archivoJson)) {
            const inspeccionesFile = require(archivoJson);
            // console.log('ARCHIVO: ',inspeccionesFile);
            inspeccionesFile.push(req.body);
            const inspeccionesFileStream = fs.createWriteStream(archivoJson);
            inspeccionesFileStream.write(JSON.stringify(inspeccionesFile, null, 2));
            inspeccionesFileStream.on('finish', ()=>{
                inspeccionesFileStream.close()
            }); 
            fs.mkdir(carpeta, (err)=>{
                if(!err) return res.status(201).json({message: 'Información recibida, se agrega info al archivo y se crea nueva carpeta de imágenes.' });
                if(err) return res.status(200).json({message: 'Información recibida, se agrega info al archivo, no se crea nuevamente la carpeta.' });
            })
            
        }
    }


});
/*Se responde de manera asíncrona una por una*/
app.post('/process-img-url', (req, res)=> { //Se analiza una por una
    
    const fileName = 'tempImage_bordes.jpg';
    const { url } = req.body;
    console.log('url', url);

    fetching(url).then(()=>{
        console.log('Después de Descarga y Análisis de Imagen, dentro de callback (req, res)=>{} en server')

        do {
            console.log('Esperando escritura de archivo analizado...')
        } while (!fs.existsSync(fileName));

        const file = fs.createReadStream(fileName, {encoding: 'base64'});
        // file.pipe(res);
        
        
        file.on('data', (chunk)=>{
            res.write(chunk);
        });
        file.on('close', ()=>{
            console.log('stream end');
            file.close();
            res.end();
        })

    });

    
    try {
        // res.sendFile(fileName, options, function (err) {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log('Sent:', fileName);
        //     }
        // });
        
    } catch (error) {
        res.status(400).json({error})
    }
})

/**Se envía una orden para ejecutar un analizador 
 * y que escriba en servidor las imágenes resultantes */
app.post('/analizar/fisuras', AnalizadorFisuras, (req, res)=>{
    console.log('LOG PYTHON OUTPUT',req.body.python_output)
    res.status(200).json({message: req.body.python_output })
});

const server = app.listen(443, ()=>console.log('Servidor escuchando peticiones http en puerto', server.address()))