const { spawnSync } = require('child_process');

function Analizador(req, res, next) {
    const { folder, tipo_imagen } = req.body;
    let file = '';
    console.log(folder);
    if(tipo_imagen==='normal'){
        file = 'Analizador_Fisuras.py';
        console.log('Analizar Fisuras');
    }else {
        file = 'Analizador_Fotos_Termicas.py'
        console.log('Analizar Colores');
    }

    const python = spawnSync('python3', [file, folder, 'arg2']);
    req.body.python_output = python.stdout.toString();
    console.log(req.body.python_output);
    next();
}

module.exports = Analizador;