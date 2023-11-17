const fetch =  require('node-fetch');
const fs = require('fs');

const file = fs.createWriteStream("tempImage.jpg");

function fetching() {
    const t0 = performance.now();
    fetch('https://res.cloudinary.com/dirfklbry/image/upload/v1694015195/foo/275fdc21-c7a8-41ae-93b6-b0eb33ea7bcd.jpg.jpg')
        .then(res =>{

            res.body.pipe(file);

            console.log('Termina then fetch');
            const tf = performance.now();
            console.log('tiempo de descarga:', tf-t0);
        })
        .catch(err => console.error(err))
        

}
// const https = require('https');

// const request = https.get("https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json", function(response) {
//   response.pipe(file);
// });

fetching();
console.log('DESPUES DE FETCHING DATA');