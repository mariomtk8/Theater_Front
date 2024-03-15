import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';


interface Funcion {
  nombre?: string;
  imagenes: string;
  descripcion: string;
  cartel: string;
  id?: string;
}

export const useProgramacion = defineStore('listadoObras', () => {
  const funcions = ref<Funcion[]>([]);

  const fetchFunciones = async () => {
    try {
      const response = await fetch('http://a3407cd44c6db427eb6fd4e572e5b3ab-889807298.us-east-1.elb.amazonaws.com/funciones/');
      console.log(response)
      if (!response.ok) {
        throw new Error('Error al obtener los datos de las funciones');
      }
      const data = await response.json();
      funcions.value = data;
      console.log("Funciones cargadas:", funcions.value); 
    } catch (error) {
      console.error('Error al obtener los datos de las funciones:', error);
    }
  };

  return {
    funcions, fetchFunciones
  };
})
