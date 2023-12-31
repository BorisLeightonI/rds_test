const busboy = require('busboy');
const { createWriteStream } = require('node:fs');

const takeAndSendFile = (req, res, next) =>{
  console.log(req.headers);
  const { fecha, patente } = req.headers;
    const bb = busboy({ headers: req.headers });
    req.pipe(bb);
    const carpeta = `./inspecciones/${patente}-${fecha}/`;

    bb.on('file', (name, file, info) => {
      console.log('name from front-end: ', name);
      const { filename, encoding, mimeType } = info;
      console.log(`File [${filename}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      );
      try {
        file.pipe(createWriteStream(carpeta+filename));
        
      } catch (error) {
        console.log('ERROR');
        console.log(error);
      }
    file
      .on('data', (data) => {
        console.log(`File [${filename}] got ${data.length} bytes`);
      }).on('close', () => {
        console.log(`File [${filename}] done`);
      }).on('end', ()=>{
        console.log('Ready to send data to Python Script');
      });
    });
    bb.on('field', (name, val, info) => console.log(`Field [${name}]: value: %j`, val));
    bb.on('close', () => {
        console.log('Done parsing form!');
        next();
    });
    bb.on('error', (err)=>{
        res.status(400).json({message: err})
      });
}

module.exports = takeAndSendFile;
