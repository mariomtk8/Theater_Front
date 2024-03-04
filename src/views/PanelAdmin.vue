<template>
  <div class="admin-panel">
    <h1>Panel de Administrador - Funciones de Teatro</h1>
<<<<<<< HEAD
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
      
=======
    <div v-for="funcion in funcions" :key="funcion.id" class="funcion-container">
      <h2>{{ funcion.nombre }}</h2>
      <p>{{ funcion.descripcion }}</p>
      <p><strong>Autores:</strong> {{ funcion.autoresArray }}</p>
      <p><strong>Duración:</strong> {{ funcion.duracion }} minutos</p>
      <p><strong>Actores:</strong> {{ funcion.actoresArray }}</p>
      <p><strong>Fechas:</strong> {{ funcion.fechasArray }}</p>
      <div class="imagenes-container">
        <img :src="funcion.cartel" alt="Imagen de la función">
      </div>
      <button @click="deleteFuncionById(funcion.id)">Eliminar Función</button>
      <button @click="toggleEdit(funcion.id)">Editar Función</button>
      <!-- Agregamos un div para mostrar los campos de edición -->
      <div v-if="funcion.editing">
        <input v-model="funcion.nombre" placeholder="Nombre">
        <textarea v-model="funcion.descripcion" placeholder="Descripción"></textarea>
        <input v-model="funcion.autoresArray" placeholder="Autores">
        <input v-model="funcion.duracion" placeholder="Duración">
        <input v-model="funcion.actoresArray" placeholder="Actores">
        <input v-model="funcion.fechasArray" placeholder="Fechas">
        <input v-model="funcion.cartel" placeholder="Cartel">
        <!-- Agrega otros campos de edición según sea necesario -->
        <button @click="guardarEdicion(funcion.id)">Guardar</button>
        <button @click="cancelarEdicion(funcion.id)">Cancelar</button>
      </div>
    </div>
=======
    <div v-for="funcion in funcions" :key="funcion.id" class="funcion-container">
      <h2>{{ funcion.nombre }}</h2>
      <p>{{ funcion.descripcion }}</p>
      <p><strong>Autores:</strong> {{ funcion.autoresArray }}</p>
      <p><strong>Duración:</strong> {{ funcion.duracion }} minutos</p>
      <p><strong>Actores:</strong> {{ funcion.actoresArray }}</p>
      <p><strong>Fechas:</strong> {{ funcion.fechasArray }}</p>
      <div class="imagenes-container">
        <img :src="funcion.cartel" alt="Imagen de la función">
      </div>
      <button @click="deleteFuncionById(funcion.id)">Eliminar Función</button>
      <button @click="toggleEdit(funcion.id)">Editar Función</button>
      <!-- Agregamos un div para mostrar los campos de edición -->
      <div v-if="funcion.editing">
        <input v-model="funcion.nombre" placeholder="Nombre">
        <textarea v-model="funcion.descripcion" placeholder="Descripción"></textarea>
        <input v-model="funcion.autoresArray" placeholder="Autores">
        <input v-model="funcion.duracion" placeholder="Duración">
        <input v-model="funcion.actoresArray" placeholder="Actores">
        <input v-model="funcion.fechasArray" placeholder="Fechas">
        <input v-model="funcion.cartel" placeholder="Cartel">
        <!-- Agrega otros campos de edición según sea necesario -->
        <button @click="guardarEdicion(funcion.id)">Guardar</button>
        <button @click="cancelarEdicion(funcion.id)">Cancelar</button>
      </div>
    </div>
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
    <!-- Campos para agregar nueva función -->
    <div v-if="agregandoNuevaFuncion">
      <input v-model="nuevaFuncion.nombre" placeholder="Nombre">
      <textarea v-model="nuevaFuncion.descripcion" placeholder="Descripción"></textarea>
      <input v-model="nuevaFuncion.autoresArray" placeholder="Autores">
      <input v-model="nuevaFuncion.duracion" placeholder="Duración">
      <input v-model="nuevaFuncion.actoresArray" placeholder="Actores">
      <input v-model="nuevaFuncion.fechasArray" placeholder="Fechas">
      <input v-model="nuevaFuncion.cartel" placeholder="Cartel">
      <!-- Agrega otros campos según sea necesario -->
      <button @click="guardarNuevaFuncion">Guardar</button>
      <button @click="cancelarNuevaFuncion">Cancelar</button>
    </div>
    <button @click="toggleAgregandoNuevaFuncion">Agregar Nueva Función</button>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
import { ref, onMounted } from 'vue';

interface Funcion {
  nombre: string;
  descripcion: string;
  autoresArray: string[];
  actoresArray: string[];
  fechasArray: string[];
  duracion: string;
  cartel: string;
  id: string;
  editing: boolean; // Nueva propiedad para indicar si se está editando esta función
}

const funcions = ref<Funcion[]>([]); // Esta es tu lista de funciones

const fetchFunciones = async () => {
    try {
        const response = await fetch('/api/funciones');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de las funciones');
        }
        const data: Funcion[] = await response.json(); // Asegura que la data sea de tipo Funcion[]
        funcions.value = data.map(funcion => ({ ...funcion, editing: false })); // Inicialmente ninguna función está siendo editada
    } catch (error) {
        console.error('Error al obtener los datos de las funciones:', error);

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


onMounted(() => {
    fetchFunciones();
});

const deleteFuncionById = async (idfuncion: string) => {
    try {
        const response = await fetch(`/api/funciones/${idfuncion}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Función con id ${idfuncion} eliminada correctamente`);
            // Corrige aquí, utiliza .value y luego el método filter
            funcions.value = funcions.value.filter((funcion: Funcion) => funcion.id !== idfuncion);
        } else {
            console.error('Error al eliminar la función');
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
}

const toggleEdit = (id: string) => {
  funcions.value = funcions.value.map(funcion => ({
    ...funcion,
    editing: funcion.id === id ? !funcion.editing : false
  }));
}

const guardarEdicion = async (idfuncion: string) => {
  const funcion = funcions.value.find(funcion => funcion.id === idfuncion);
  if (funcion) {
    await updateFuncionById(idfuncion, funcion);
    funcion.editing = false; // Finaliza la edición
  }
}

const cancelarEdicion = (idfuncion: string) => {
  const funcion = funcions.value.find(funcion => funcion.id === idfuncion);
  if (funcion) {
    funcion.editing = false; // Cancela la edición
  }
}

const updateFuncionById = async (idfuncion: string, data: Funcion) => {
    try {
        const response = await fetch(`/api/funciones/${idfuncion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log(`Función con id ${idfuncion} actualizada correctamente`);
            // Aquí puedes agregar lógica para actualizar la lista de funciones si es necesario
            // Por ejemplo, puedes recargar la lista completa de funciones o actualizar el objeto específico
        } else {
            console.error('Error al actualizar la función');
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
};

// Inicializa nuevaFuncion con valores predeterminados
const nuevaFuncion: Funcion = {
  nombre: '',
  descripcion: '',
  autoresArray: [],
  actoresArray: [],
  fechasArray: [],
  duracion: '',
  cartel: '',
  id: '', // Dejar vacío, probablemente se generará en el backend
  editing: false // Por defecto, la nueva función no está siendo editada
};

const agregarFuncion = async () => {
  try {
    const response = await fetch('/api/funciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaFuncion), // Envía los datos de la nueva función en el cuerpo de la solicitud
    });

    if (response.ok) {
      console.log('Nueva función agregada correctamente');
      // Puedes hacer algo después de agregar la función, como limpiar los campos o actualizar la lista de funciones
      // No hay necesidad de modificar 'Funcion.value' ya que no parece ser relevante aquí
      // Aquí puedes agregar lógica para recargar la lista de funciones si es necesario
    } else {
      console.error('Error al agregar la función');
    }
  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
  }
};

// Maneja la visibilidad de los campos para agregar nueva función
const agregandoNuevaFuncion = ref(false);

const toggleAgregandoNuevaFuncion = () => {
  agregandoNuevaFuncion.value = !agregandoNuevaFuncion.value;
};

const guardarNuevaFuncion = async () => {
  // Realiza las operaciones necesarias antes de guardar la nueva función
  await agregarFuncion();

  // Después de guardar, oculta los campos de nueva función
  agregandoNuevaFuncion.value = false;
};

const cancelarNuevaFuncion = () => {
  // Si se cancela la creación de la nueva función, simplemente oculta los campos
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

<<<<<<< HEAD

=======
>>>>>>> f6fbbcaf9338cfe574855f8c89d39d3907ae94d9
</style>
