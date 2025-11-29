// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

// Parámetros del servidor
const host = 'localhost';
const port = 3030;

const app = express();

app.use(express.json());

/*
  Cargamos la paleta inicial desde data/colores.json al iniciar el servidor.
  Se guarda en memoria y luego los endpoints trabajan sobre ese array.
*/
let colores = [];

(async () => {
  try {
    const dataPath = path.join(__dirname, 'data', 'colores.json');
    const fileContent = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(fileContent);
    colores = data.colores || [];
    console.log(`Paleta inicial cargada: ${colores.length} colores.`);
  } catch (err) {
    console.error('No se pudo cargar colores.json al iniciar:', err);
  }
})();

/* ENDPOINTS API  */

/*
  GET /api/colores?cantidad=10&from=0
  Devuelve una colores con paginación.
  Valida que cantidad y from sean enteros válidos.
*/
app.get('/api/colores', (req, res) => {
  // Valores por defecto si no vienen en la query
  let { cantidad = '10', from = '0' } = req.query;

  const cantidadNum = parseInt(cantidad, 10);
  const fromNum = parseInt(from, 10);

  // Validación de entrada
  if (
    Number.isNaN(cantidadNum) ||
    Number.isNaN(fromNum) ||
    cantidadNum <= 0 ||
    fromNum < 0
  ) {
    return res.status(400).json({
      error:
        'Los parámetros "cantidad" y "from" deben ser enteros válidos (cantidad > 0, from >= 0).',
    });
  }

  const slice = colores.slice(fromNum, fromNum + cantidadNum);
  return res.json(slice); // devolvemos solo el array de colores
});

/*
  GET /api/colores/:id
  Devuelve un solo color por id.
  Si no existe, responde 404.
*/
app.get('/api/colores/:id', (req, res) => {
  const { id } = req.params;
  const color = colores.find((c) => c.id === id);

  if (!color) {
    return res
      .status(404)
      .json({ error: `No se encontró un color con id "${id}".` });
  }

  return res.json(color);
});

/*
  POST /api/colores
  Crea un nuevo color.
  Valida que vengan "id" y "src" como string; si falta algo o es inválido, 400.
*/
app.post('/api/colores', (req, res) => {
  const { id, src } = req.body;

  if (typeof id !== 'string' || !id.trim()) {
    return res
      .status(400)
      .json({ error: 'El campo "id" es obligatorio y debe ser string.' });
  }

  if (typeof src !== 'string' || !src.trim()) {
    return res
      .status(400)
      .json({ error: 'El campo "src" es obligatorio y debe ser string.' });
  }

  // Validar que no se repita el id
  if (colores.some((c) => c.id === id)) {
    return res
      .status(400)
      .json({ error: `Ya existe un color con id "${id}".` });
  }

  const nuevoColor = { id: id.trim(), src: src.trim() };
  colores.push(nuevoColor);

  return res.status(201).json(nuevoColor);
});

/*
  PUT /api/colores/:id
  Actualiza el "src" de un color existente.
  Valida que venga un "src" string; si falta algo, 400.
  Si no existe el color, 404.
*/
app.put('/api/colores/:id', (req, res) => {
  const { id } = req.params;
  const { src } = req.body;

  if (typeof src !== 'string' || !src.trim()) {
    return res
      .status(400)
      .json({ error: 'El campo "src" es obligatorio y debe ser string.' });
  }

  const color = colores.find((c) => c.id === id);
  if (!color) {
    return res
      .status(404)
      .json({ error: `No se encontró un color con id "${id}".` });
  }

  color.src = src.trim();
  return res.json(color);
});

/* ====== SERVIR ARCHIVOS ESTÁTICOS DEL TPO2 ====== */

/*
  Servir todo lo estático de /public:
  HTML, CSS, JS, imágenes, etc.
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
  Ruta principal: página inicial de la app.
*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginaPrincipal.html'));
});

/*
  Opcional: mantener el endpoint viejo /colores.json por compatibilidad,
  aunque el front nuevo ya NO lo usa.
*/
app.get('/colores.json', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'colores.json');
    const fileContent = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(fileContent);
    res.json(data);
  } catch (err) {
    console.error('Error leyendo colores.json:', err);
    res.status(500).json({ error: 'No se pudo leer la paleta de colores' });
  }
});

// Levantar el server
app.listen(port, host, () => {
  console.log(`Servidor levantado en http://${host}:${port}`);
});
