<template>
  <div class="admin-panel">
    <h1>Panel de Administrador - Funciones de Teatro</h1>
    <div v-for="funcion in funciones" :key="funcion.id" class="funcion-container">
      <h2>{{ funcion.nombre }}</h2>
      <p class="descripcion">{{ funcion.descripcion }}</p>
      <div class="info-container">
        <div class="info">
          <strong>Autores:</strong> {{ funcion.autores }}
        </div>
        <div class="info">
          <strong>Duración:</strong> {{ funcion.duracion }} minutos
        </div>
        <div class="info">
          <strong>Actores:</strong> {{ funcion.actores }}
        </div>
        <div class="info">
          <strong>Fechas:</strong> {{ funcion.fechaUno }} - {{ funcion.fechaDos }} - {{ funcion.fechaTres }}
        </div>
      </div>
      <div class="imagenes-container">
        <img :src="funcion.cartel" alt="Imagen de la función">
      </div>
      <div class="buttons-container">
        <button @click="borrarFuncion(funcion.id)" class="delete-button">Eliminar Función</button>
        <button @click="toggleEdit(funcion.id)" class="edit-button">{{ funcion.editing ? 'Cancelar' : 'Editar' }}</button>
      </div>
      <div v-if="funcion.editing" class="edit-form">
        <input v-model="funcion.nombre" placeholder="Nombre" class="input-field">
        <textarea v-model="funcion.descripcion" placeholder="Descripción" class="input-field"></textarea>
        <input v-model="funcion.autores" placeholder="Autores" class="input-field">
        <input v-model="funcion.duracion" placeholder="Duración" class="input-field">
        <input v-model="funcion.actores" placeholder="Actores" class="input-field">
        <input type="date" v-model="funcion.fechaUno" placeholder="Fecha 1" class="input-field">
        <input type="date" v-model="funcion.fechaDos" placeholder="Fecha 2" class="input-field">
        <input type="date" v-model="funcion.fechaTres" placeholder="Fecha 3" class="input-field">
        <input v-model="funcion.cartel" placeholder="Cartel" class="input-field">
        <div class="button-container">
          <button @click="guardarEdicion(funcion)" class="save-button">Guardar</button>
          <button @click="cancelarEdicion(funcion)" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
    <div v-if="agregandoNuevaFuncion" class="add-function-container">
      <h2>Agregar Nueva Función</h2>
      <div class="new-function-form">
        <input v-model="nuevaFuncion.nombre" placeholder="Nombre" class="input-field">
        <textarea v-model="nuevaFuncion.descripcion" placeholder="Descripción" class="input-field"></textarea>
        <input v-model="nuevaFuncion.autores" placeholder="Autores" class="input-field">
        <input v-model="nuevaFuncion.duracion" placeholder="Duración" class="input-field">
        <input v-model="nuevaFuncion.actores" placeholder="Actores" class="input-field">
        <input type="date" v-model="nuevaFuncion.fechaUno" placeholder="Fecha 1" class="input-field">
        <input type="date" v-model="nuevaFuncion.fechaDos" placeholder="Fecha 2" class="input-field">
        <input type="date" v-model="nuevaFuncion.fechaTres" placeholder="Fecha 3" class="input-field">
        <input v-model="nuevaFuncion.cartel" placeholder="Cartel" class="input-field">
        <div class="button-container">
          <button @click="guardarNuevaFuncion" class="save-button">Guardar</button>
          <button @click="cancelarNuevaFuncion" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
    <button @click="toggleAgregandoNuevaFuncion" class="add-function-button">Agregar Nueva Función</button>
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
  duracion: 0,
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

  // const maxId = funciones.reduce((max, funcion) => Math.max(max, funcion.id), 0);
  // nuevaFuncion.value.id = maxId + 1;
  guardarFuncion(nuevaFuncion.value); 
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', autores: '', duracion: 0, actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '' }; 
  agregandoNuevaFuncion.value = false; 
};
const cancelarNuevaFuncion = () => {
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', autores: '', duracion: 0, actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '' }; 
  agregandoNuevaFuncion.value = false; 
};
</script>
  
<style scoped>
.admin-panel {
  background-color: #f8f9fa;
  color: #1E3367;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.funcion-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.descripcion {
  margin-bottom: 10px;
}

.info-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.info {
  margin-right: 20px;
}

.imagenes-container img {
  width: 200px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.edit-form {
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.add-function-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.add-function-button {
  background-color: #1E3367;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-function-button:hover {
  background-color: #002447;
}

.save-button,
.cancel-button,
.delete-button,
.edit-button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button,
.edit-button {
  background-color: #1E3367;
  color: #fff;
}

.cancel-button,
.delete-button {
  background-color: #002447;
  color: #ffffff;
}

.save-button:hover,
.edit-button:hover,
.cancel-button:hover,
.delete-button:hover {
  background-color: #002447;
}

</style>