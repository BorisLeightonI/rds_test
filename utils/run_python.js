const { spawnSync } = require('child_process');

function runPython(req, res, next) {
    const python = spawnSync('python3', ['test_OpenCV_readImg.py', 'arg1', 'arg2']);
    console.log(python.stdout.toString());
    next();
}

module.exports = runPython;