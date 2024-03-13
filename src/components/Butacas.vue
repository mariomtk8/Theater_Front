<template>
    <div ref="AsientosContainer" class="asientos-container"></div>
    <div class="comprar-entradas">
      <p id="total-price">Precio Total: 0 €</p>
      <button id="buy-button" @click="realizarCompraYRecargarAsientos">Comprar</button>
    </div>
    <div v-if="detalleCompraVisible" class="detalle-compra">
      <h2>Detalles de la compra</h2>
      <p v-if="butacasSeleccionadas.length > 0">
        Butacas seleccionadas: {{ butacasSeleccionadas.join(', ') }}
      </p>
      <p><strong>Sesion:</strong> {{ detalleCompra.idSesion }}</p>
    </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFuncionesStore } from '../store/CompraEntradas';

const route = useRoute();
const idFuncion = route.params.Id as string;
const idSesion = route.query.idSesion as string;
const AsientosContainer = ref<HTMLElement | null>(null);
const store = useFuncionesStore();

const asientosSeleccionados = ref(new Set<number>());
const butacasSeleccionadas = ref<number[]>([]);
const precioTotal = ref(0);
const precioFijoAsiento = 10;

const detalleCompraVisible = ref(false);
const detalleCompra = ref({
  idButaca: null as number | null,
  precio: null as number | null,
  idSesion: null as string | null,
});

onMounted(async () => {
  await store.resetearYRecargarAsientos(idFuncion, idSesion);
  await store.cargarAsientosOcupados(idFuncion, idSesion);
  await store.cargarTodosLosAsientos();
  nextTick(() => {
    generarButacas();
  });
});
    //Acciones al realizar la compra
const toggleSeatSelection = (asientoId: number) => {
  const asiento = store.asientos.find(a => a.idAsiento === asientoId);
  if (!asiento || !asiento.isFree) return;

  if (asientosSeleccionados.value.has(asientoId)) {
    asientosSeleccionados.value.delete(asientoId);
    butacasSeleccionadas.value = Array.from(asientosSeleccionados.value);
    precioTotal.value -= precioFijoAsiento;
    document.getElementById(`asiento-${asientoId}`)!.style.fill = '#00008B';
  } else {
    asientosSeleccionados.value.add(asientoId);
    butacasSeleccionadas.value = Array.from(asientosSeleccionados.value);
    precioTotal.value += precioFijoAsiento;
    document.getElementById(`asiento-${asientoId}`)!.style.fill = 'yellow';
  }
  asientosSeleccionados.value = new Set(asientosSeleccionados.value);
  document.getElementById('total-price')!.innerText = `Precio Total: ${precioTotal.value} €`;

  // Mostrar los detalles de la compra
  detalleCompra.value = {
    idButaca: asientoId,
    precio: precioFijoAsiento,
    idSesion: idSesion,
  };
  detalleCompraVisible.value = true;
};

const realizarCompra = async () => {
  const asientosParaComprar = Array.from(asientosSeleccionados.value).map(idAsiento => ({
    idAsiento,
    isFree: true,
    precio: precioFijoAsiento
  }));
  if (asientosParaComprar.length > 0) {
    await store.comprarAsientos(asientosParaComprar, idFuncion, idSesion);
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con éxito',
      html: `Total pagado: ${precioTotal.value} €<br>Butacas Compradas: ${butacasSeleccionadas.value.join(', ')}<br>Sesión: ${idSesion}`,
    });
    precioTotal.value = 0;
    asientosSeleccionados.value.clear();
    await store.cargarAsientosOcupados(idFuncion, idSesion);
    await store.cargarTodosLosAsientos();
    generarButacas();
  }
};

function generarButacas() {
  console.log('Generando butacas en componente Vue...');
  const anchoAsiento = 40, altoAsiento = 40, espacioEntreAsientos = 10, espacioEntreFilas = 30;
  const asientosPorFila = 6;
  let svgHTML = `<svg width="400" height="450">`;

  // Detalles del escenario
  svgHTML += `<rect x="0" y="10" width="${asientosPorFila * (anchoAsiento + espacioEntreAsientos)}" height="50" fill="#8B4513" />`;
  svgHTML += `<text x="${(asientosPorFila * (anchoAsiento + espacioEntreAsientos)) / 2}" y="45" font-family="Arial" font-size="24" fill="white" border-radious text-anchor="middle">Escenario</text>`;

  // Agregar números de butacas a la izquierda de cada fila
  for (let i = 0; i < store.asientos.length; i += asientosPorFila) {
    const fila = Math.floor(i / asientosPorFila);
    const y = fila * (altoAsiento + espacioEntreFilas) + 100 + (altoAsiento / 2); // Posición vertical en el centro de la fila
    svgHTML += `<text x="300" y="${y}" font-family="Arial" font-size="16" fill="black" text-anchor="start">${i + 1} - ${i + asientosPorFila}</text>`;
  }

  store.asientos.forEach((asiento, index) => {
    const fila = Math.floor(index / asientosPorFila);
    const posAsiento = index % asientosPorFila;
    const x = posAsiento * (anchoAsiento + espacioEntreAsientos);
    const y = fila * (altoAsiento + espacioEntreFilas) + 100;
    const color = asiento.isFree ? '#00008B' : '#FF0000';
    // detalles de la butaca
    const pathD = `M ${x + 8} ${y + 20}
                       Q ${x + 5} ${y + 10}, ${x + 10} ${y}
                       L ${x + 30} ${y}
                       Q ${x + 35} ${y + 10}, ${x + 32} ${y + 20}
                       L ${x + 28} ${y + 30}
                       L ${x + 12} ${y + 30} Z`;
    // Butacas con estilos
    svgHTML += `<path id="asiento-${asiento.idAsiento}" d="${pathD}" fill="${color}" stroke="black" stroke-width="2" style="cursor: pointer; transition: fill 0.5s ease;"></path>`;
  });

  svgHTML += '</svg>';

  nextTick(() => {
    if (AsientosContainer.value) {
      AsientosContainer.value.innerHTML = svgHTML;
      AsientosContainer.value.querySelectorAll('path[id^="asiento-"]').forEach(path => {
        path.addEventListener('click', () => {
          const asientoId = parseInt(path.id.replace('asiento-', ''));
          toggleSeatSelection(asientoId);
        });
      });
      console.log('Butacas y escenario detallados insertados en el DOM');
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
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.main-block {
  background-color: #1E3367;
  color: white;
  text-align: center;
  padding: 20px 0;
}

.main-block h1 {
  font-size: 32px;
  margin: 0;
}

.article-block {
  text-align: center;
}

.asientos-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 7vh;
}

.comprar-entradas {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#total-price {
  font-size: 20px;
  margin-top: 20px;
}

#buy-button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #1E3367;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}

.detalle-compra {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  text-align: left;
}

.detalle-compra h2 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #1e3367;
  text-align: center;
}

.detalle-compra p {
  margin-bottom: 5px;
  text-align: center;
}
</style>