<template>
  <div class="admin-panel">
    <h1>{{ $t('adminPanel.title') }}</h1>
    <div v-for="funcion in funciones" :key="funcion.id" class="funcion-container">
      <h2>{{ funcion.nombre }}</h2>
      <p class="descripcion">{{ funcion.descripcion }}</p>
      <div class="info-container">
        <div class="info">
          <strong>{{ $t('adminPanel.authors') }}:</strong> {{ funcion.autores }}
        </div>
        <div class="info">
          <strong>{{ $t('adminPanel.duration') }}:</strong> {{ funcion.duracion }} {{ $t('adminPanel.minutes') }}
        </div>
        <div class="info">
          <strong>{{ $t('adminPanel.actors') }}:</strong> {{ funcion.actores }}
        </div>
        <div class="info">
          <strong>{{ $t('adminPanel.dates') }}:</strong> {{ funcion.fechaUno }} - {{ funcion.fechaDos }} - {{ funcion.fechaTres }}
        </div>
      </div>
      <div class="imagenes-container">
        <img :src="funcion.cartel" :alt="$t('adminPanel.functionImageAlt')">
      </div>
      <div class="buttons-container">
        <button @click="borrarFuncion(funcion.id)" class="delete-button">{{ $t('adminPanel.delete') }}</button>
        <button @click="toggleEdit(funcion.id)" class="edit-button">{{ funcion.editing ? $t('adminPanel.cancel') : $t('adminPanel.edit') }}</button>
        <button @click="toggleEditSesiones(funcion.id)" class="edit-sessions-button">{{ funcion.editingSesiones ? $t('adminPanel.cancelEditSessions') : $t('adminPanel.editSessions') }}</button>
      </div>
      <div v-if="funcion.editing" class="edit-form">
        <div>
          <strong>{{ $t('adminPanel.name') }}:</strong>
          <input v-model="funcion.nombre" :placeholder="$t('adminPanel.name')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.description') }}:</strong>
          <textarea v-model="funcion.descripcion" :placeholder="$t('adminPanel.description')" class="input-field"></textarea>
        </div>
        <div>
          <strong>{{ $t('adminPanel.authors') }}:</strong>
          <input v-model="funcion.autores" :placeholder="$t('adminPanel.authors')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.duration') }}:</strong>
          <input v-model="funcion.duracion" :placeholder="$t('adminPanel.duration')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.actors') }}:</strong>
          <input v-model="funcion.actores" :placeholder="$t('adminPanel.actors')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.dates') }}:</strong>
          <input type="date" v-model="funcion.fechaUno" :placeholder="$t('adminPanel.dateOne')" class="input-field">
          <input type="date" v-model="funcion.fechaDos" :placeholder="$t('adminPanel.dateTwo')" class="input-field">
          <input type="date" v-model="funcion.fechaTres" :placeholder="$t('adminPanel.dateThree')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.poster') }}:</strong>
          <input v-model="funcion.cartel" :placeholder="$t('adminPanel.poster')" class="input-field">
        </div>
        <div class="button-container">
          <button @click="guardarEdicion(funcion)" class="save-button">{{ $t('adminPanel.save') }}</button>
          <button @click="cancelarEdicion(funcion)" class="cancel-button">{{ $t('adminPanel.cancel') }}</button>
        </div>
      </div>
      <div v-if="funcion.editingSesiones" class="edit-sessions-form">
        <h3>{{ $t('adminPanel.editSessionsTitle') }}</h3>
        <div v-for="sesion in sesiones[funcion.id]" :key="sesion.idSesion" class="session-container">
          <input type="datetime-local" v-model="sesion.fecha" class="input-field">
          <button @click="guardarFechaSesion(funcion.id, sesion.idSesion, sesion.fecha)" class="save-session-button">{{ $t('adminPanel.save') }}</button>
          <button @click="borrarSesion(funcion.id, sesion.idSesion)" class="delete-session-button">{{ $t('adminPanel.deleteSession') }}</button>
        </div>
        <button @click="agregarNuevaSesion(funcion.id)" class="add-session-button">{{ $t('adminPanel.addSession') }}</button>
      </div>
    </div>
    <div v-if="agregandoNuevaFuncion" class="add-function-container">
      <h2>{{ $t('adminPanel.addNewFunction') }}</h2>
      <div class="new-function-form">
        <div>
          <strong>{{ $t('adminPanel.name') }}:</strong>
          <input v-model="nuevaFuncion.nombre" :placeholder="$t('adminPanel.name')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.description') }}:</strong>
          <textarea v-model="nuevaFuncion.descripcion" :placeholder="$t('adminPanel.description')" class="input-field"></textarea>
        </div>
        <div>
          <strong>{{ $t('adminPanel.images') }}:</strong>
          <input v-model="nuevaFuncion.imagenes" :placeholder="$t('adminPanel.images')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.authors') }}:</strong>
          <input v-model="nuevaFuncion.autores" :placeholder="$t('adminPanel.authors')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.duration') }}:</strong>
          <input v-model="nuevaFuncion.duracion" :placeholder="$t('adminPanel.duration')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.actors') }}:</strong>
          <input v-model="nuevaFuncion.actores" :placeholder="$t('adminPanel.actors')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.dates') }}:</strong>
          <input type="date" v-model="nuevaFuncion.fechaUno" :placeholder="$t('adminPanel.dateOne')" class="input-field">
          <input type="date" v-model="nuevaFuncion.fechaDos" :placeholder="$t('adminPanel.dateTwo')" class="input-field">
          <input type="date" v-model="nuevaFuncion.fechaTres" :placeholder="$t('adminPanel.dateThree')" class="input-field">
        </div>
        <div>
          <strong>{{ $t('adminPanel.poster') }}:</strong>
          <input v-model="nuevaFuncion.cartel" :placeholder="$t('adminPanel.poster')" class="input-field">
        </div>
        <div class="button-container">
          <button @click="guardarNuevaFuncion" class="save-button">{{ $t('adminPanel.save') }}</button>
          <button @click="cancelarNuevaFuncion" class="cancel-button">{{ $t('adminPanel.cancel') }}</button>
        </div>
      </div>
    </div>
    <button @click="toggleAgregandoNuevaFuncion" class="add-function-button">{{ $t('adminPanel.addNewFunction') }}</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFuncionesStore } from '../store/PanelAdmin';
import type { Funcion, Sesion } from '../store/PanelAdmin';

const { funciones, sesiones, cargarFunciones, guardarFuncion, actualizarFuncion, borrarFuncion, agregarNuevaSesion, borrarSesion, actualizarFechaSesion, cargarSesiones } = useFuncionesStore();

const nuevaFuncion = ref<Funcion>({
  id: 0,
  nombre: '',
  imagenes: '',
  descripcion: '',
  autores: '',
  duracion: 0,
  actores: '',
  fechaUno: '',
  fechaDos: '',
  fechaTres: '',
  cartel: '',
  editing: false,
  editingSesiones: false
});

const agregandoNuevaFuncion = ref(false);

onMounted(cargarFunciones);

const toggleEdit = (id: number) => {
  funciones.forEach(funcion => {
    if (funcion.id === id) {
      funcion.editing = !funcion.editing;
    } else {
      funcion.editing = false;
    }
  });
};

const toggleEditSesiones = async (id: number) => {
  funciones.forEach(async funcion => {
    if (funcion.id === id) {
      funcion.editingSesiones = !funcion.editingSesiones;
      if (funcion.editingSesiones) {
        await cargarSesiones(funcion.id);
      }
    } else {
      funcion.editingSesiones = false;
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
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', imagenes: '', autores: '', duracion: 0, actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '', editing: false, editingSesiones: false };
  agregandoNuevaFuncion.value = false;
};

const cancelarNuevaFuncion = () => {
  nuevaFuncion.value = { id: 0, nombre: '', descripcion: '', imagenes: '', autores: '', duracion: 0, actores: '', fechaUno: '', fechaDos: '', fechaTres: '', cartel: '', editing: false, editingSesiones: false };
  agregandoNuevaFuncion.value = false;
};

const guardarFechaSesion = (idFuncion: number, idSesion: number, fecha: string | null) => {
  if (fecha) {
    actualizarFechaSesion(idFuncion, idSesion, fecha);
  } else {
    console.error('Fecha no puede ser null');
  }
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
    justify-content: flex-start;
  }
  .edit-button{
    margin-left: 10vh;
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

  .edit-sessions-button{
    background-color: #1E3367;
    color: #fff;
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 6vh;
  }

  .add-session-button{
    background-color: #1E3367;
    color: #fff;
    margin-top: 4vh;
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .save-session-button{
    background-color: #1E3367;
    color: #fff;
    margin-left: 4vh;
  }

  .delete-session-button{
    background-color: #9b0808;
    color: #fff;
    margin-left: 6vh;
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
    background-color: #7e0f0f;
    color: #ffffff;
  }
  
  .save-button:hover,
  .edit-button:hover,
  .cancel-button:hover,
  .delete-button:hover {
    background-color: #002447;
  }
  </style>