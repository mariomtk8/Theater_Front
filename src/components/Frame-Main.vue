<template>
    <section class="frame-function" v-if="store.funcion">
        <div class="frame-function__poster">
          <img :src="store.funcion.imagenes.split(',')[0]" alt="Imagen de la obra" v-if="store.funcion.imagenes" />
        </div>
        <div class="frame-function__title">
          <h2>{{ store.funcion.nombre }}</h2>
        </div>
      </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchFuncion } from '../store/InfoFuncion';

const store = useFetchFuncion();
const route = useRoute();

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
    align-items: center;
    justify-content: space-around; 
    background-color: #1E3367;
    width: 80%; 
    max-width: 977px;
    height: 450px;
    text-align: center;
    margin: 20px auto; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    padding: 20px; 
  }
  
  .frame-function__poster {
    flex: 1;
    display: flex;
    align-items: center; 
    justify-content: center; 
  }
  
  .frame-function__poster img {
    width: 320px;
    height: 360px;
    border-radius: 5px; 
  }
  
  .frame-function__title {
    flex: 1;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 0 20px; 
  }
  
  .frame-function__title h2 {
    font-size: 30px;
    color: white;
    margin: 0; 
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5); 
  }
</style>