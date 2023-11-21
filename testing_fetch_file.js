const fetch =  require('node-fetch');
const fs = require('fs');
const { spawnSync } = require('child_process');


function fetching(url) {
    const t0 = performance.now();
    const res =  fetch(url)
    .then(async ans =>{
            const file = fs.createWriteStream("tempImage.jpg");
            // const buffer = await ans.arrayBuffer();
            // console.log(buffer);
            // fs.writeFileSync('tempImage.jpg', buffer.buffer);
            ans.body.pipe(file);//Escribe la imagen que corresponde a la url

            console.log('Termina primer then fetch: Descarga de Imagen');
            const tf = performance.now();
            console.log('*   tiempo de descarga:', Math.round(tf-t0), 'ms');
            
        })
        .then(()=>{
            console.log('THEN INTERMEDIO PARA PROCESAR IMAGEN');
            const python = spawnSync('python3', ['test_OpenCV_readImg.py', 'arg1', 'arg2']);
            console.log(python.stdout.toString());
        
            // python.stdout.on('data', (data)=>console.log(data.toString()));
            // python.on('close', (code)=>console.log('PYTHON FILE EXIT with code', code));
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