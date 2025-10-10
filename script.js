(function () {
  const paleta = document.querySelector('.paleta');
  const fondo = document.getElementById('fondo');
  const mano = document.getElementById('mano');

  // Cargar colores desde el archivo JSON ---
  fetch('./colores.json')
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar colores.json');
      return res.json();
    })
    .then(data => {
      
      const colores = data.colores;

      // Limpiamos el contenido previo del div
      paleta.innerHTML = '';

      // Creamos cada miniatura de color
      colores.forEach(({ id, src }) => {
        const img = document.createElement('img');
        img.id = id;
        img.src = src;
        img.className = 'imagenColor';

        // Cuando se hace click, cambia el fondo con un efecto suave
        img.addEventListener('click', () => {
          fondo.style.opacity = 0;
          setTimeout(() => {
            fondo.src = img.src;
            fondo.style.opacity = 1;
          }, 300);
        });

        paleta.appendChild(img);
      });

    })
    .catch(err => console.error('Error al cargar el JSON:', err));

  // Matriz de formas y largos de uñas
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

  // Botón de reset
const btnReset = document.getElementById('btnReset');
btnReset.addEventListener('click', () => {
  // Restaurar el color de fondo al inicial
  fondo.style.opacity = 0;
  setTimeout(() => {
    fondo.src = 'https://images-ext-1.discordapp.net/external/4hw6z4JvhIpaLXqrZYKb5uWH_ZPD6sXKtyQgwz9y8YA/%3Fq%3Dtbn%3AANd9GcRQrephGiUfNcRkBeyB9R10_Qya5Jl99Iqe_w%26s/https/encrypted-tbn0.gstatic.com/images?format=webp&width=293&height=293';
    fondo.style.opacity = 1;
  }, 300);

  // Restaurar la mano a la opción inicial (0, 0)
  cambiarMano(0, 0);
});
})();
