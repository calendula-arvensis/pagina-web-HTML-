// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Servir la carpeta public
app.use(express.static(path.join(dirname, 'public')));

// Endpoint para devolver los colores
app.get('/api/colores', (req, res) => {
  const dataPath = path.join(dirname, 'data', 'colores.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  res.send(data);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
});