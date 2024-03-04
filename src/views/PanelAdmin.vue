<template>
  <div class="admin-panel">
    <h1>Panel de Administrador - Funciones de Teatro</h1>
    <div v-for="funcion in funciones" :key="funcion.id" class="funcion-container">
      <h2>{{ funcion.nombre }}</h2>
      <p>{{ funcion.descripcion }}</p>
      <p><strong>Autores:</strong> {{ funcion.autores }}</p>
      <p><strong>Duración:</strong> {{ funcion.duracion }} minutos</p>
      <p><strong>Actores:</strong> {{ funcion.actores }}</p>
      <p><strong>Fecha 1:</strong> {{ funcion.fechaUno }}</p>
      <p><strong>Fecha 2:</strong> {{ funcion.fechaDos }}</p>
      <p><strong>Fecha 3:</strong> {{ funcion.fechaTres }}</p>
      <div class="imagenes-container">
        <img :src="funcion.cartel" alt="Imagen de la función">
      </div>
      <button @click="borrarFuncion(funcion.id)">Eliminar Función</button>
      <button @click="toggleEdit(funcion.id)">Editar Función</button>
      <div v-if="funcion.editing">
        <input v-model="funcion.nombre" placeholder="Nombre">
        <textarea v-model="funcion.descripcion" placeholder="Descripción"></textarea>
        <input v-model="funcion.autores" placeholder="Autores">
        <input v-model="funcion.duracion" placeholder="Duración">
        <input v-model="funcion.actores" placeholder="Actores">
        <input type="date" v-model="funcion.fechaUno" placeholder="Fecha 1">
        <input type="date" v-model="funcion.fechaDos" placeholder="Fecha 2">
        <input type="date" v-model="funcion.fechaTres" placeholder="Fecha 3">
        <input v-model="funcion.cartel" placeholder="Cartel">
        
        <button @click="guardarEdicion(funcion)">Guardar</button>
        <button @click="cancelarEdicion(funcion)">Cancelar</button>
      </div>
    </div>
    <div v-if="agregandoNuevaFuncion">
      <!-- Campos para agregar nueva función aquí -->
      <input v-model="nuevaFuncion.nombre" placeholder="Nombre">
      <textarea v-model="nuevaFuncion.descripcion" placeholder="Descripción"></textarea>
      <input v-model="nuevaFuncion.autores" placeholder="Autores">
      <input v-model="nuevaFuncion.duracion" placeholder="Duración">
      <input v-model="nuevaFuncion.actores" placeholder="Actores">
      <input type="date" v-model="nuevaFuncion.fechaUno" placeholder="Fecha 1">
      <input type="date" v-model="nuevaFuncion.fechaDos" placeholder="Fecha 2">
      <input type="date" v-model="nuevaFuncion.fechaTres" placeholder="Fecha 3">
      <input v-model="nuevaFuncion.cartel" placeholder="Cartel">
      
      <button @click="guardarNuevaFuncion">Guardar</button>
      <button @click="cancelarNuevaFuncion">Cancelar</button>
    </div>
    <button @click="toggleAgregandoNuevaFuncion">Agregar Nueva Función</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFuncionesStore } from '../store/PanelAdmin';
import type { Funcion } from '../store/PanelAdmin'; 

const { funciones, cargarFunciones, guardarFuncion, actualizarFuncion, borrarFuncion } = useFuncionesStore();

const nuevaFuncion = ref<Funcion>({
  id: 0, 
  nombre: '',
  descripcion: '',
  autores: '',
  duracion: '',
  actores: '',
  fechaUno: '',
  fechaDos: '',
  fechaTres: '',
  cartel: '',
  editing: false
});

const agregandoNuevaFuncion = ref(false);

onMounted(cargarFunciones);

const toggleEdit = (id: number) => { 
  funciones.forEach(funcion => {
    if(funcion.id === id) {
      funcion.editing = !funcion.editing;
    } else {
      funcion.editing = false;
    }
  });
};

const guardarEdicion = (funcion: Funcion) => { 
  actualizarFuncion(funcion);
  funcion.editing = false;
};

const cancelarEdicion = (funcion: Funcion) => { 
  funcion.editing = false; 
  cargarFunciones(); 
};

const toggleAgregandoNuevaFuncion = () => {
  agregandoNuevaFuncion.value = !agregandoNuevaFuncion.value;
};

const guardarNuevaFuncion = () => {
  guardarFuncion(nuevaFuncion.value); 
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', autores: '', duracion: '', actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '', editing: false }; // Restablece la función a valores predeterminados
  agregandoNuevaFuncion.value = false; 
};

const cancelarNuevaFuncion = () => {
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', autores: '', duracion: '', actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '', editing: false }; // Restablece la función a valores predeterminados
  agregandoNuevaFuncion.value = false; 
};
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