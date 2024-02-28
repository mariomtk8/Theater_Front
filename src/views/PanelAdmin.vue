<template>
    <div class="admin-panel">
      <h1>Panel de Administrador - Funciones de Teatro</h1>
      <div v-for="funcion in funcions" :key="funcions.id" class="funcion-container">
        <h2>{{ funcion.nombre }}</h2>
        <p>{{ funcion.descripcion }}</p>
        <p><strong>Autores:</strong> {{ funcion.autoresArray }}</p>
        <p><strong>Duración:</strong> {{ funcion.Duracion }} minutos</p>
        <p><strong>Actores:</strong> {{ funcion.actoresArray }}</p>
        <p><strong>Fechas:</strong> {{ funcion.fechasArray }}</p>
        <div class="imagenes-container">
          <img :src="funcion.cartel" alt="Imagen de la función">
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  interface Funcion {
    nombre: string;
    descripcion: string;
    autoresArray: string[];
    actoresArray:string[];
    fechasArray: string[];
    Duracion :number;
    cartel : string;
    id: string;
}
  
  const funcions = ref<Funcion[]>([]);

const fetchFunciones = async () => {
    try {
        const response = await fetch('/api/funciones');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de las funciones');
        }
        const data = await response.json();
        funcions.value = data;
    } catch (error) {
        console.error('Error al obtener los datos de las funciones:', error);
    }
};

onMounted(() => {
    fetchFunciones();
    
});
const fetchIdFuncione = async (idfuncion: string) => {
    try {
        const response = await fetch(`/api/funciones/${idfuncion}`);
        if (response.ok) {
            const data: Funcion = await response.json();
            funcions.value = data;
        } else {
            console.error('Error al obtener los datos de la obra');
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
}

onMounted(() => {

    const route = useRoute();
    const idfuncion = route.params.Id as string; 
    if (idfuncion) {
console.log(idfuncion);

    fetchIdFuncione(idfuncion);
    }
});

  </script>
  
  <style scoped>
  .admin-panel {
    background-color: white;
    color: #1E3367;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .funcion-container {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 2px solid #1E3367;
  }
  
  h1, h2 {
    color: #1E3367;
  }
  
  .imagenes-container img {
    max-width: 200px; /* Ajusta esto según necesites */
    height: auto;
    border-radius: 5px;
  }
  
  </style>
  