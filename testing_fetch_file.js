const fetch =  require('node-fetch');
const fs = require('fs');
const { spawnSync } = require('child_process');


async function fetching(url) {
    const t0 = performance.now();
    const res =  fetch(url)
    .then(async ans =>{
            // const file = fs.createWriteStream("tempImage.jpg");
            // file.on('open', ()=>console.log('open'));
            // file.on('close', ()=>console.log('close'));
            // file.on('finish', ()=>console.log('finish'));
            // file.on('pipe', ()=>console.log('pipe'));
            // file.on('unpipe', ()=>console.log('unpipe'));
            // console.log('then fetch file from url')
            const buffer = await ans.arrayBuffer();
            console.log('Se crea buffer y se ingresa en writeFileSync')
            // console.log(buffer);
            // ans.body.pipe(file);//Escribe la imagen que corresponde a la url
            fs.writeFileSync('tempImage.jpg', Buffer.from(buffer));

            console.log('Termina Descarga y escritura de Imagen ');
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
        
    return await res;
}
// const https = require('https');

// const request = https.get("https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json", function(response) {
//   response.pipe(file);
// });


console.log('DESPUES DE FETCHING DATA');
module.exports = fetching;