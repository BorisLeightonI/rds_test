const { spawnSync } = require('child_process');

function runPython(req, res, next) {
    const python = spawnSync('python3', ['leerImagenes_obtenerMaximo.py', 'arg1', 'arg2']);
    const scores =  python.stdout.toString();
    req.body.scores = scores;
    console.log(JSON.parse(scores));
    next();
}

module.exports = runPython;