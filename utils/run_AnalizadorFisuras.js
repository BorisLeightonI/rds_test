const { spawnSync } = require('child_process');

function AnalizadorFisuras(req, res, next) {
    const { folder } = req.body;
    const python = spawnSync('python3', ['Analizador_Fisuras.py', folder, 'arg2']);
    req.body.python_output = python.stdout.toString();
    console.log(req.body.python_output);
    next();
}

module.exports = AnalizadorFisuras;