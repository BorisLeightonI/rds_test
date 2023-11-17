// const fetch =  require('node-fetch');
// import fs from 'node:fs';
const fs = require('fs');

const file = fs.createWriteStream("tempImage.jpg");

function fetching() {
    const t0 = performance.now();
    fetch('https://res.cloudinary.com/dirfklbry/image/upload/v1694015195/foo/275fdc21-c7a8-41ae-93b6-b0eb33ea7bcd.jpg.jpg')
        // .then(res => res.arrayBuffer())
        // .then(data => data.replaceAll('} ', '},'))
        .then(buffer =>{
            buffer.pipe(file);
            // file.write(buffer);
            // file.end();
            console.log('Termina then fetch');
            const tf = performance.now();
            console.log('tiempo de descarga:', tf-t0);
            // jsonString = String(json);
            // jsonString.
        })
        .catch(err => console.error(err))
        

}
// const https = require('https');

// const request = https.get("https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json", function(response) {
//   response.pipe(file);
// });

fetching();
console.log('DESPUES DE FETCHING DATA');