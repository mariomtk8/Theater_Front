<template>
  <main>
    <article class="article-block">
      <div class="main-block">
        <h1>Compra de entradas</h1>
      </div>
      <section class="frame-function" v-if="funcion">
        <div class="frame-function__poster">
          <img :src="funcion.imagenesArray[0]" alt="Imagen de la obra">
        </div>
        <div class="frame-function__title">
          <h2>{{ funcion.nombre }}</h2>
        </div>
      </section>
    </article>
    <div ref="cinemaSeatsContainer" class="cinema-seats"></div>
    <p id="total-price">Precio Total: 0 €</p>
    <button id="buy-button" @click="comprarAsientos">Comprar</button>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';

interface Funcion {
  nombre: string;
  descripcion: string;
  imagenesArray: string[];
  actoresArray: string[];
  fechasArray: string[];
  id: string;
}

interface Asiento {
  idAsiento: number;
  isFree: boolean;
}

interface AsientoOcupado {
  idAsiento: number;
}

const funcion = ref<Funcion | null>(null);
let asientos = ref<Asiento[]>([]);
const cinemaSeatsContainer = ref<HTMLElement | null>(null);
const asientosSeleccionados = ref<Asiento[]>([]);
let asientosOcupados = ref<AsientoOcupado[]>([]);
const route = useRoute();
const idFuncion = route.params.Id as string;
const idSesion = route.query.idSesion as string;

onMounted(async () => {
  try {
    const respuestaFuncion = await fetch(`/api/funciones/${idFuncion}`);
    if (respuestaFuncion.ok) {
      funcion.value = await respuestaFuncion.json();
    } else {
      console.error("Error al cargar la función");
    }

    const respuestaOcupados = await fetch(`/api/Funciones/${idFuncion}/Sesion/${idSesion}`);
    if (respuestaOcupados.ok) {
      const datosOcupados = await respuestaOcupados.json();
      asientosOcupados.value = datosOcupados.map((asiento: any) => ({
        idAsiento: asiento.idAsiento
      }));
    } else {
      console.error("Error al cargar los asientos ocupados");
    }

    const respuestaAsientos = await fetch(`/api/Asientos`);
    if (respuestaAsientos.ok) {
      const datosAsientos = await respuestaAsientos.json();
      asientos.value = datosAsientos.map((asiento: any) => ({
        idAsiento: asiento.idAsiento,
        isFree: !asientosOcupados.value.some(ocupado => ocupado.idAsiento === asiento.idAsiento)
      }));
    } else {
      console.error("Error al cargar todos los asientos");
    }

    generarButacas();
  } catch (error) {
    console.error("Error en la carga de datos:", error);
  }
});

function generarButacas() {
  const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 20;
  const anchoReposabrazos = 10, altoReposabrazos = altoAsiento;
  const anchoSvg = (anchoAsiento + espacioEntreAsientos + anchoReposabrazos * 2) * 5;

  const anchoPantalla = anchoSvg * 0.8;
  const altoPantalla = 100;
  const xPantalla = (anchoSvg - anchoPantalla) / 2;
  const yPantalla = 20;

  let svgHTML = `<svg width="350" height="400">`;

  asientos.value.forEach((asiento, index) => {
    const fila = Math.floor(index / 5);
    const posAsiento = index % 5;
    const x = posAsiento * (anchoAsiento + espacioEntreAsientos* 2);
    const y = fila * (altoAsiento + espacioEntreFilas) + altoPantalla + yPantalla * 2;
    const color = asiento.isFree ? '#00008B' : 'red';

    svgHTML += `<rect id="asiento-${asiento.idAsiento}" x="${x + anchoReposabrazos}" y="${y}" width="${anchoAsiento}" height="${altoAsiento}" rx="5" ry="5" style="stroke:black; fill:${color}" />`;

  });

  svgHTML += '</svg>';

  nextTick(() => {
    if (cinemaSeatsContainer.value) {
      cinemaSeatsContainer.value.innerHTML = svgHTML;
      cinemaSeatsContainer.value.querySelectorAll('rect').forEach(rect => {
        const idAsiento = parseInt(rect.id.replace('asiento-', ''));
        if (asientos.value.find(a => a.idAsiento === idAsiento && a.isFree)) {
          rect.addEventListener('click', () => {
            cambiarColor(rect);
          });
        }
      });
    }
  });
}

function cambiarColor(asiento: SVGElement) {
  const idAsiento = parseInt(asiento.id.replace('asiento-', ''));

  const indexSeleccionado = asientosSeleccionados.value.findIndex(a => a.idAsiento === idAsiento);

  const estaOcupado = asientosOcupados.value.some(a => a.idAsiento === idAsiento);


  if (estaOcupado) {
    return;
  }

  if (indexSeleccionado > -1) {
    asientosSeleccionados.value.splice(indexSeleccionado, 1);
    asiento.style.fill = '#00008B';
  } else {

    asientosSeleccionados.value.push({ idAsiento, isFree: false });
    asiento.style.fill = 'red';
  }
}

async function comprarAsientos() {
  try {
    const url = `/api/Funciones/${idFuncion}/Sesion/${idSesion}/ReservarAsiento`;
    const asientosParaEnviar = asientosSeleccionados.value.map(asiento => ({
      idAsiento: asiento.idAsiento,
      isFree: false
    }));
    const respuesta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asientosParaEnviar),
    });

    if (!respuesta.ok) {
      throw new Error('Error en la reserva de asientos');
    }

    console.log('Reserva realizada con éxito');
    asientosSeleccionados.value = [];
  } catch (error) {
    console.error('Error al realizar la reserva:', error);
  }
}

const calcularTotal = computed(() => asientosSeleccionados.value.length * 5);
</script>
    
  <style>
  body,
  h1,
  h2,
  p,
  ul,
  li,
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  .asientos-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35vh; /* O la altura deseada */
}
  
  
  .article-block {
    display: flex;
    justify-content: right;
    margin-top: 10vh;
    flex-direction: column;
  }
  
  .main-block {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    background-color: #1E3367;
    height: 13vh;
    margin-bottom: 10vh;
  }
  
  .main-block h1 {
    color: white;
    font-size: xx-large;
    margin-left: 20vh;
  }
  
  /* Estilos del marco de la función */
  .frame-function {
    display: flex;
    align-items: center;
    background-color: #1E3367;
    width: 800px;
    height: 450px;
    text-align: center;
    max-width: 977px;
    margin: auto;
  }
  
  .frame-function__poster {
    flex: 1;
  }
  
  .frame-function__poster img {
    width: 280px;
  }
  
  .frame-function__title {
    flex: 1;
  }
  
  .frame-function__title h2 {
    font-size: 30px;
    color: white;
  }
  
  /* Estilos del contenedor */
  #container {
    text-align: center;
  }
  
  h2 {
    color: #333;
  }
  
  .container-frame {
    margin-top: 20px;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button {
    margin-left: 10px;
  }
  
  section {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15vh;
  }
  
  .container {
    text-align: center;
  }
  
  /* Estilos para el contenedor de los asientos */
  #asientos {
    text-align: center;
    margin: 20px auto;
  }
  
  /* Estilos para las filas de asientos */
  .row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  /* Estilos para cada asiento */
  .seat {
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: #bdc3c7;
    border-radius: 3px;
    /* Opcional: para asientos redondeados */
    display: block;
    cursor: pointer;
  }
  
  /* Estilos para asientos seleccionados */
  .seat.selected {
    background-color: #3498db;
  }
  
  .seat {
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: #bdc3c7;
    border-radius: 3px;
    /* Opcional: para asientos redondeados */
    display: block;
    cursor: pointer;
  }
  
  
  
  .seat.comprado {
    background-color: #ff0000;
    
    cursor: not-allowed;
   
  }
  
  
  /* Estilos para el texto del precio total */
  #total-price {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
  }
  
  /* Estilos para el botón de compra */
  #buy-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #1E3367;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  /* Estilos del pie de página */
  .footer {
    margin-top: 10vh;
    display: flex;
    align-items: center;
    background-color: #1E3367;
    text-align: center;
    width: 100%;
    height: 25vh;
  }
  
  .footer__logo {
    flex: 0.7;
    text-align: right;
  }
  
  .footer__menu {
    flex: 1;
    text-align: center;
  }
  
  .footer__menu a {
    color: white;
    margin-right: 2vh;
  }
  
  .footer__networks {
    flex: 0.7;
    text-align: left;
  }
  
  .footer__logo img {
    width: 90px;
    border-radius: 70px;
  }
  
  .footer__networks img {
    width: 40px;
    margin-right: 4vh;
  }
  </style>
  