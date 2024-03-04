import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';


interface Funcion {
  nombre?: string;
  imagenes: string;
  id?: string;
}

export const useProgramacion = defineStore('listadoObras', () => {
  const funcions = ref<Funcion[]>([]);

  const fetchFunciones = async () => {
    try {
      const response = await fetch('/api/funciones/');
      console.log(response)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de las funciones');
      }
      const data = await response.json();
      funcions.value = data;
      console.log("Funciones cargadas:", funcions.value); // Depuración adicional
    } catch (error) {
      console.error('Error al obtener los datos de las funciones:', error);
    }
  };

  return {
    funcions, fetchFunciones
  };
})
