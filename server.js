require('./testing_run_fetch_file');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const server = app.listen(port, ()=>console.log('Servidor escuchando peticiones http en puerto', server.address()))