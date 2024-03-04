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
import FrameMain from '@/components/Frame-Main.vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFuncionesStore } from '../store/CompraEntradas';

const route = useRoute();
const idFuncion = route.params.Id as string;
const idSesion = route.query.idSesion as string;
const AsientosContainer = ref<HTMLElement | null>(null);
const store = useFuncionesStore();

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
}
};

function generarButacas() {
    console.log('Generando butacas en componente Vue...');
    const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 20;
    const asientosPorFila = 6;
    let svgHTML = `<svg width="${asientosPorFila * (anchoAsiento + espacioEntreAsientos)}" height="400">`;

    store.asientos.forEach((asiento, index) => {
        const fila = Math.floor(index / asientosPorFila);
        const posAsiento = index % asientosPorFila;
        const x = posAsiento * (anchoAsiento + espacioEntreAsientos);
        const y = fila * (altoAsiento + espacioEntreFilas);
        const color = asiento.isFree ? '#00008B' : 'red';
        const pathD = `M ${x + 10} ${y}, Q ${x} ${y + 10}, ${x + 10} ${y + 20}, L ${x + 30} ${y + 20}, Q ${x + 40} ${y + 10}, ${x + 30} ${y}, Z`;
        svgHTML += `<path id="asiento-${asiento.idAsiento}" d="${pathD}" fill="${color}" stroke="black"></path>`;
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
  