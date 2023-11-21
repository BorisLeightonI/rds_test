const fetch =  require('node-fetch');
const fs = require('fs');
const { spawn } = require('child_process');


function fetching(url) {
    const file = fs.createWriteStream("tempImage.jpg");
    const t0 = performance.now();
    const res =  fetch(url)
        .then(ans =>{

            ans.body.pipe(file);//Cambiar

            console.log('Termina then fetch: Descarga de Imagen');
            const tf = performance.now();
            console.log('*   tiempo de descarga:', Math.round(tf-t0), 'ms');
            
        })
        .then(()=>{
            // for (let i = 0; i < 1000000000; i++) {
            //     const element = ++i;
            // }
            console.log('THEN INTERMEDIO PARA PROCESAR IMAGEN');
            const python = spawn('python3', ['test_OpenCV_readImg.py', 'arg1', 'arg2']);
            python.on('message', (data)=>console.log('data', data.toString()));
            python.stdout.on('data', (data)=>console.log(data.toString()));
            python.on('close', (code)=>console.log('PYTHON FILE EXIT with code', code));
            python.on('', (code)=>console.log('PYTHON FILE EXIT with code', code));


        })
        .catch(err => console.error(err))
        
    return res;
}
// const https = require('https');

// const request = https.get("https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json", function(response) {
//   response.pipe(file);
// });


console.log('DESPUES DE FETCHING DATA');
module.exports = fetching;