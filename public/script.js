(function () {
  const paleta = document.querySelector('.paleta');
  const fondo = document.getElementById('fondo');
  const mano = document.getElementById('mano');

  // PAGINACIÓN DE COLORES DESDE LA API
  const CANTIDAD_POR_PAGINA = 3;  // cuántos colores pedir por página
  let offset = 0; // from actual

  // Creamos el botón "Ver más colores" dentro de la paleta
  const btnMasColores = document.createElement('button');
  btnMasColores.id = 'btnMasColores';
  btnMasColores.className = 'btn-mas-colores';
  btnMasColores.textContent = 'Ver más colores';
  // Lo agregamos al final de la paleta (después irán los colores antes del botón)
  paleta.appendChild(btnMasColores);

  // Creamos un <img> miniatura para un color y agregamos el evento de click
  function crearMiniaturaColor(color) {
    const img = document.createElement('img');
    img.id = color.id;
    img.src = color.src;
    img.className = 'imagenColor';

    // Cuando se hace click, cambia el fondo con un efecto suave
    img.addEventListener('click', () => {
      fondo.style.opacity = 0;
      setTimeout(() => {
        fondo.src = img.src;
        fondo.style.opacity = 1;
      }, 300);
    });

    return img;
  }

  // Traemos una página de colores desde la API y los agregamos a la paleta
  async function cargarColores() {
    try {
      const res = await fetch(
        `/api/colores?cantidad=${CANTIDAD_POR_PAGINA}&from=${offset}`
      );
      if (!res.ok) {
        throw new Error('No se pudo cargar colores desde la API');
      }

      const data = await res.json(); // esperamos un array de colores

      if (!Array.isArray(data)) {
        throw new Error('Respuesta inesperada de la API de colores');
      }

      // Si no vienen más colores, deshabilitamos el botón
      if (data.length === 0) {
        btnMasColores.disabled = true;
        btnMasColores.textContent = 'No hay más colores';
        return;
      }

      // Insertamos cada color antes del botón (para que el botón quede siempre al final)
      data.forEach((color) => {
        const img = crearMiniaturaColor(color);
        paleta.insertBefore(img, btnMasColores);
      });

      // Actualizamos el offset para la próxima página
      offset += data.length;
    } catch (err) {
      console.error('Error al cargar los colores:', err);
    }
  }

  // Primera carga de colores
  cargarColores();

  // Cuando se hace click en "Ver más colores", pedimos la siguiente página
  btnMasColores.addEventListener('click', cargarColores);

  // === MATRIZ DE FORMAS Y LARGOS DE UÑAS ===
  let formasYLargos;

  function inicializarMatrizMano() {
    formasYLargos = new Array(3);
    formasYLargos[0] = new Array(
      'fondo-mesa-manicura/redondas/largo1.png',
      'fondo-mesa-manicura/redondas/largo2.png',
      'fondo-mesa-manicura/redondas/largo3.png'
    );
    formasYLargos[1] = new Array(
      'fondo-mesa-manicura/cuadradas/largo1.png',
      'fondo-mesa-manicura/cuadradas/largo2.png',
      'fondo-mesa-manicura/cuadradas/largo3.png'
    );
    formasYLargos[2] = new Array(
      'fondo-mesa-manicura/puntiagudas/largo1.png',
      'fondo-mesa-manicura/puntiagudas/largo2.png',
      'fondo-mesa-manicura/puntiagudas/largo3.png'
    );
  }

  // Esta función se llama desde los botones de la tabla en el HTML
  window.cambiarMano = function (nroForma, nroLargo) {
    mano.src = formasYLargos[nroForma][nroLargo];
  };

  // Inicializamos la matriz y la imagen por defecto
  inicializarMatrizMano();
  window.addEventListener('DOMContentLoaded', () => {
    window.cambiarMano(0, 0);
  });

  // === BOTÓN DE RESET DEL DISEÑO ===
  const btnReset = document.getElementById('btnReset');
  btnReset.addEventListener('click', () => {
    // Restaurar el color de fondo al inicial
    fondo.style.opacity = 0;
    setTimeout(() => {
      fondo.src =
        'https://images-ext-1.discordapp.net/external/4hw6z4JvhIpaLXqrZYKb5uWH_ZPD6sXKtyQgwz9y8YA/%3Fq%3Dtbn%3AANd9GcRQrephGiUfNcRkBeyB9R10_Qya5Jl99Iqe_w%26s/https/encrypted-tbn0.gstatic.com/images?format=webp&width=293&height=293';
      fondo.style.opacity = 1;
    }, 300);

    // Restaurar la mano a la opción inicial (0, 0)
    cambiarMano(0, 0);
  });
})();
