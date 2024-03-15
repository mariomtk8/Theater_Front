<template>
  <div class="contenedor">
    <!-- Renderizar todas las tarjetas de compras -->
    <div v-for="(compra, index) in compras" :key="index" class="tarjeta">
      <h2 class="titulo">Detalles de la Compra {{ index + 1 }}</h2>
      <div class="detalle-compra">
        <p v-if="compra.butacasSeleccionadas && compra.butacasSeleccionadas.length > 0">
          <strong class="Butacas">Butacas Compradas:</strong> {{ compra.butacasSeleccionadas.join(', ') }}
        </p>
        <p><strong class="Butacas">Sesión:</strong> {{ compra.idSesion }}</p>
        <div class="horarios" v-if="store.funcion">
          <p v-if="idSesion === '3'">
            Fecha de la Sesión: {{ store.funcion.fechaTres }}
          </p>
          <p v-if="idSesion === '2'">
            Fecha de la Sesión: {{ store.funcion.fechaDos }}
          </p>
          <p v-if="idSesion === '1'">
            Fecha de la Sesión: {{ store.funcion.fechaUno }}
          </p>
        </div>
        <RouterLink to="/Programacion" class="nav__link">Comprar más entradas</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetchFuncion } from '../store/InfoFuncion';

const store = useFetchFuncion();
const route = useRoute();
const router = useRouter();
const idSesion = computed(() => route.query.idSesion as string);

onMounted(async () => {
    await nextTick();
    const idfuncion = route.params.Id as string;
    if (idfuncion) {
        await store.fetchFunciones(idfuncion);
    } else {
        console.error('ID de función no encontrado en la ruta.');
    }
});

// Array para almacenar los detalles de todas las compras realizadas
const compras = ref<Array<{ butacasSeleccionadas: number[], idSesion: string }>>([]);

onMounted(() => {
  obtenerDatosDesdeURL();
});

const obtenerDatosDesdeURL = () => {
  // Acceder a los datos de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const butacas = urlParams.getAll('butacasSeleccionadas').flatMap(value => value.split(',')).map(Number);
  const idSesion = route.query.idSesion as string;

  // Agregar los detalles de la compra actual al array de compras
  compras.value.push({ butacasSeleccionadas: butacas, idSesion: idSesion });
};

const irAProgramacion = () => {
  router.push('/programacion');
};
</script>

<style scoped>
/* Estilos para la tarjeta */
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.tarjeta {
  width: 450px;
  background-color: #f9f9f9;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.Butacas {
  font-size: 30px;
  color: #555555;
  margin-bottom: 20px;
}

.titulo {
  color: #91891f;
  font-size: 40px;
  margin-bottom: 20px;
}

.detalle-compra p {
  margin-bottom: 20px;
  font-size: 24px;
}

.detalle-compra strong {
  color: #333333;
}

.horarios {
  margin-bottom: 30px;
}

.nav__link {
  padding: 15px 30px;
  font-size: 20px;
  cursor: pointer;
  background-color: #1E3367;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav__link:hover {
  background-color: #40578b;
}
</style>