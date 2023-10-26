const fetch =  require('node-fetch');
// import fs from 'node:fs';
const fs = require('fs');

const file = fs.createWriteStream("dataset.json");
function fetching() {
    const t0 = performance.now();
    fetch('https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json?raw=true')
        .then(res => res.text())
        .then(data => data.replaceAll('} ', '},'))
        .then(json =>{
            // console.log(json)
            file.write('[');
            file.write(json);
            file.write(']');
            file.end();
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