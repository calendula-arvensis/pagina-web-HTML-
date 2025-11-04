// server.js
const express = require('express'); // Importa el framework Express
const path = require('path'); // Módulo para manejar rutas de archivos
const fs = require('fs').promises; // Módulo para manejar el sistema de archivos con promesas

// Parámetros del servidor
const host = 'localhost';
const port = 3030;

const app = express(); // Crea una instancia de la aplicación Express

/* Servir todo lo estático de /public: 
  Si el navegador pide cualquier archivo (HTML, CSS, JS, imagen, ...) 
  que exista dentro de la carpeta public, entregáselo automáticamente
*/
app.use(express.static(path.join(__dirname, 'public')));

/* Endpoint (ruta) para enviar el JSON que está en /data
  Cuando el navegador pide '/colores.json', el servidor busca el archivo
  'data/colores.json', lo lee y lo envía como respuesta. */
app.get('/colores.json', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'colores.json');  // Ruta completa al archivo colores.json
    const fileContent = await fs.readFile(dataPath, 'utf8');  // Se lee el contenido del archivo como texto (utf8)
    const data = JSON.parse(fileContent); // Convierto el .json (texto) a un objeto de JavaScript
    res.json(data); // Envío el objeto como respuesta en formato JSON
  } catch (err) {
    /* Si ocurre un error (archivo no encontrado o JSON mal formado),
      se muestra el error en la consola del servidor y enviamos un mensaje de error al cliente */
    console.error('Error leyendo colores.json:', err);
    res.status(500).json({ error: 'No se pudo leer la paleta de colores' });  // Error 50500: Error interno del servidor
  }
});

// Defino la ruta principal: Página principal que está dentro de public 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginaPrincipal.html'));
});

// Levantar el server
// El usuario entra a http://localhost:3030/ 
app.listen(port, host, () => {
  console.log(`Servidor levantado en http://${host}:${port}`);
});
