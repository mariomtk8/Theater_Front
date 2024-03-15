<template>
  <section class="frame-function" v-if="store.funcion">
    <div class="frame-function__poster">
      <img :src="store.funcion.imagenes.split(',')[0]" alt="Imagen de la obra" v-if="store.funcion.imagenes" />
    </div>
    <div class="frame-function__title">
      <h2>{{ store.funcion.nombre }}</h2>
    </div>
    <div class="frame-function__date">
      <p class="fechas" v-if="idSesion === '3'">
        Fecha: {{ store.funcion.fechaTres }}
      </p>
      <p class="fechas" v-if="idSesion === '2'">
        Fecha: {{ store.funcion.fechaDos }}
      </p>
      <p class="fechas" v-if="idSesion === '1'">
        Fecha: {{ store.funcion.fechaUno }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed,onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchFuncion } from '../store/InfoFuncion';

const store = useFetchFuncion();
const route = useRoute();
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
</script>

<style scoped>
  .frame-function {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1E3367;
    width: 80%;
    max-width: 977px;
    height: auto;
    text-align: center;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
  }

  .frame-function__poster img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .fechas {
    font-size: 27px;
  }

  .frame-function__content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 20px;
  }

  .frame-function__title h2 {
    font-size: 30px;
    color: gold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .frame-function__date {
    font-size: 18px;
    color: white;
    margin-top: 10px;
  }

  .frame-function__date span {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    .frame-function__poster {
      order: 2; 
    }

    .frame-function__content {
      margin-top: 0;
    }
  }
</style>