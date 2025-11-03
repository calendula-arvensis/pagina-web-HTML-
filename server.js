// server.js
const express = require('express'); 
const path = require('path'); 
const http = require('http');
const fs = require('fs').promises; // usamos la versión con promesas

const host = 'localhost';
const port = 3030;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/colores', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'colores.json');

    fs.readFile(dataPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error('Error leyendo colores.json:', err);
            res.status(500).json({ error: 'No se pudo leer la paleta de colores' });
            return;
        }

        // fileContent es texto; lo parseamos a objeto JS
        const data = JSON.parse(fileContent);

        // Le devolvemos el JSON al navegador
        res.json(data);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paginaPrincipal.html'));
});

// const listener = (req, res) => {
//     // leemos el HTML que queremos servir
//     fs.readFile(__dirname + '/paginaPrincipal.html', 'utf8')
//         .then(content => {
//             // armamos la respuesta
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(content);
//         })
//         .catch(err => {
//             // si falla la lectura del archivo
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.end('Error interno del servidor:\n' + err);
//         });
// };

const server = http.createServer(listener);

server.listen(port, host, () => {
    console.log(`Servidor levantado en http://${host}:${port}`);
});

