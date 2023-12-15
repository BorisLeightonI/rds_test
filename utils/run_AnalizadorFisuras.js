const { spawnSync } = require('child_process');

function Analizador(req, res, next) {
    const { folder, tipo_imagen } = req.body;
    let file = '';

    if(tipo_imagen==='normal'){
        file = 'Analizador_Fisuras.py';
    }else {
        file = 'Analizador_Fotos_Termicas.py'
    }

    const python = spawnSync('python3', [file, folder, 'arg2']);
    req.body.python_output = python.stdout.toString();
    console.log(req.body.python_output);
    next();
}

module.exports = Analizador;