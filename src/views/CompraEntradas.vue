<template>
  <main>
    <article class="article-block">
      <div class="main-block">
        <h1>Compra de entradas</h1>
      </div>
      <FrameMain></FrameMain>
    </article>
    <div ref="AsientosContainer" class="asientos-container"></div>
    <p id="total-price">Precio Total: 0 €</p>
    <button id="buy-button" @click="realizarCompraYRecargarAsientos">Comprar</button>
  </main>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import FrameMain from '@/components/Frame-Main.vue';
=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFuncionesStore } from '../store/CompraEntradas';



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
// interface asientosOcupados{
//   idAsiento: number;
// }

const funcion = ref<Funcion | null>(null);
const asientos = ref<Asiento[]>([]);
const AsientosContainer = ref<HTMLElement | null>(null);
const asientosSeleccionados = ref<Asiento[]>([]);
let asientosOcupados = ref<Asiento[]>([]); // Cambié el tipo aquí para alinear con la estructura de Asiento
<<<<<<< HEAD

=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
const route = useRoute();
const idFuncion = route.params.Id as string;
const idSesion = route.query.idSesion as string;
const AsientosContainer = ref<HTMLElement | null>(null);
const store = useFuncionesStore();

<<<<<<< HEAD

const asientosSeleccionados = ref(new Set<number>());
onMounted(async () => {
    await store.resetearYRecargarAsientos(idFuncion, idSesion);
    await store.cargarAsientosOcupados(idFuncion, idSesion);
    await store.cargarTodosLosAsientos();
    nextTick(() => {
        generarButacas();
    });
});

const toggleSeatSelection = (asientoId: number) => {
    const asiento = store.asientos.find(a => a.idAsiento === asientoId);
    if (!asiento || !asiento.isFree) return;

    if (asientosSeleccionados.value.has(asientoId)) {
        asientosSeleccionados.value.delete(asientoId);
        document.getElementById(`asiento-${asientoId}`)!.style.fill = '#00008B';
    } else {
        asientosSeleccionados.value.add(asientoId);
        document.getElementById(`asiento-${asientoId}`)!.style.fill = 'red';
    }
    asientosSeleccionados.value = new Set(asientosSeleccionados.value);
};

const realizarCompra = async () => {

const asientosParaComprar = Array.from(asientosSeleccionados.value).map(idAsiento => {
    return { idAsiento, isFree: true };
});
if (asientosParaComprar.length > 0) {
    await store.comprarAsientos(asientosParaComprar, idFuncion, idSesion);
    asientosSeleccionados.value.clear();
    await store.cargarAsientosOcupados(idFuncion, idSesion);
    await store.cargarTodosLosAsientos();

=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
async function cargarAsientosOcupados(idFuncion: string, idSesion: string) {
  try {
    const respuesta = await fetch(`/api/Funciones/${idFuncion}/Sesion/${idSesion}`);
    if (respuesta.ok) {
      const datosOcupados = await respuesta.json();
      console.log(datosOcupados)
      asientosOcupados.value = datosOcupados.map((asiento: any) => ({
        idAsiento: asiento.idAsiento,
        isFree: false // Aquí se cambió a false para indicar que estos asientos están ocupados
      }));
      
    } else {
      console.error("Error al cargar los asientos ocupados");
    }
  } catch (error) {
    console.error("Error en la carga de asientos ocupados:", error);
  }
}

async function cargarTodosLosAsientos() {
    try {
        const respuesta = await fetch(`/api/Asientos`);
        if (respuesta.ok) {
            const datosAsientos = await respuesta.json();
            console.log(datosAsientos)
            asientos.value = datosAsientos.map((asiento: any) => ({
                idAsiento: asiento.idAsiento,
                isFree: !asientosOcupados.value.some(ocupado => ocupado.idAsiento === asiento.idAsiento)
            }));
            nextTick(() => generarButacas()); // Actualizar la visualización de los asientos
        } else {
            console.error("Error al cargar todos los asientos");
        }
    } catch (error) {
        console.error("Error en la carga de todos los asientos:", error);
    }
<<<<<<< HEAD

=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
}
};

function generarButacas() {
<<<<<<< HEAD

    console.log('Generando butacas en componente Vue...');
    const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 20;
    const asientosPorFila = 6;
    let svgHTML = `<svg width="${asientosPorFila * (anchoAsiento + espacioEntreAsientos)}" height="400">`;

    store.asientos.forEach((asiento, index) => {

    const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 20;
    const asientosPorFila = 6; 
    const anchoSvg = asientosPorFila * (anchoAsiento + espacioEntreAsientos);
    let svgHTML = `<svg width="${anchoSvg}" height="400">`; 

    asientos.value.forEach((asiento, index) => {

        const fila = Math.floor(index / asientosPorFila);
        const posAsiento = index % asientosPorFila;
        const x = posAsiento * (anchoAsiento + espacioEntreAsientos);
        const y = fila * (altoAsiento + espacioEntreFilas);

        const color = asiento.isFree ? '#00008B' : 'red';
        const pathD = `M ${x + 10} ${y}, Q ${x} ${y + 10}, ${x + 10} ${y + 20}, L ${x + 30} ${y + 20}, Q ${x + 40} ${y + 10}, ${x + 30} ${y}, Z`;
        svgHTML += `<path id="asiento-${asiento.idAsiento}" d="${pathD}" fill="${color}" stroke="black"></path>`;

        const color = !asiento.isFree ? 'red' : '#00008B'; // Asegura que el color se asigna correctamente según el estado

        svgHTML += `<rect id="asiento-${asiento.idAsiento}" x="${x}" y="${y}" width="${anchoAsiento}" height="${altoAsiento}" style="stroke:black; fill:${color}"></rect>`;
    });

    svgHTML += '</svg>';

=======
    const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 20;
    const asientosPorFila = 6; 
    const anchoSvg = asientosPorFila * (anchoAsiento + espacioEntreAsientos);
    let svgHTML = `<svg width="${anchoSvg}" height="400">`; 

    asientos.value.forEach((asiento, index) => {
        const fila = Math.floor(index / asientosPorFila);
        const posAsiento = index % asientosPorFila;
        const x = posAsiento * (anchoAsiento + espacioEntreAsientos);
        const y = fila * (altoAsiento + espacioEntreFilas);
        const color = !asiento.isFree ? 'red' : '#00008B'; // Asegura que el color se asigna correctamente según el estado

        svgHTML += `<rect id="asiento-${asiento.idAsiento}" x="${x}" y="${y}" width="${anchoAsiento}" height="${altoAsiento}" style="stroke:black; fill:${color}"></rect>`;
    });

    svgHTML += '</svg>';

>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
    nextTick(() => {
        if (AsientosContainer.value) {
            AsientosContainer.value.innerHTML = svgHTML;
            AsientosContainer.value.querySelectorAll('rect').forEach(rect => {
                const idAsiento = parseInt(rect.id.replace('asiento-', ''));
                const asientoActual = asientos.value.find(a => a.idAsiento === idAsiento);
                if (asientoActual) {
                    rect.addEventListener('click', () => {
                        cambiarColor(rect, asientoActual); // Pasar asientoActual como parámetro
                    });
                }
            });
        }
    });
}
onMounted(async () => {
  await cargarAsientosOcupados(idFuncion, idSesion);
  await cargarTodosLosAsientos(); // Esto debe llamarse después y dentro de onMounted para asegurar que se usen los últimos datos.
});

function cambiarColor(asiento: SVGElement, asientoActual: Asiento) {
  const idAsiento = asientoActual.idAsiento; // Usar el idAsiento del objeto asientoActual
  const indexSeleccionado = asientosSeleccionados.value.findIndex(a => a.idAsiento === idAsiento);
  const estaOcupado = asientosOcupados.value.some(a => a.idAsiento === idAsiento);

  if (estaOcupado) {
    return; // No hacer nada si el asiento está ocupado
  }

  if (indexSeleccionado > -1) {
    asientosSeleccionados.value.splice(indexSeleccionado, 1);
    asiento.style.fill = '#00008B'; // Devolver a color original si se deselecciona
  } else {
    asientosSeleccionados.value.push({ idAsiento, isFree: false });
    asiento.style.fill = 'red'; // Cambiar a rojo si se selecciona
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

    svgHTML += '</svg>';

    nextTick(() => {
        if (AsientosContainer.value) {
            AsientosContainer.value.innerHTML = svgHTML;
            AsientosContainer.value.querySelectorAll('path[id^="asiento-"]').forEach(path => {
                const htmlPath = path as HTMLElement; 
                const idAsiento = parseInt(htmlPath.id.replace('asiento-', ''));
                const asiento = store.asientos.find(a => a.idAsiento === idAsiento);
                if (asiento) {
                    htmlPath.addEventListener('click', () => {
                        if (asiento.isFree) {
                            toggleSeatSelection(idAsiento);
                        } else {
                            htmlPath.style.cursor = "not-allowed";
                        }
                    });
                }
            });
            console.log('Butacas insertadas en el DOM');
        } else {
            console.error('El contenedor de Asientos no está disponible o no se ha encontrado en el DOM.');
        }
    });
}


const realizarCompraYRecargarAsientos = async () => {
    await realizarCompra();
    generarButacas();
};
</script>
    
  <style scoped>
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
  
  
  .article-block {
    display: flex;
    justify-content: right;
    margin-top: 10vh;
    flex-direction: column;
  }
  .asientos-container{
    display: flex;
    justify-content: center;
    margin-top: 15vh;
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
  </style>
  