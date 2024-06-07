import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

const searchQuery = ref<string>('');
const results = ref<SearchResult[]>([]);
const noResults = ref(false);
const searchError = ref(false);


interface Funcion {
  nombre?: string;
  imagenes: string;
  descripcion: string;
  cartel: string;
  id?: string;
}

interface SearchResult {
  id: number;
  nombre?: string;
  
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
      console.log("Funciones cargadas:", funcions.value); 
    } catch (error) {
      console.error('Error al obtener los datos de las funciones:', error);
    }
  };

  const fetchResults = async () => {
  noResults.value = false;
  searchError.value = false;
  if (!searchQuery.value.trim()) {
    results.value = [];
    noResults.value = true;
    return; // Salir si la consulta está vacía
  }

  try {
    const url = `/api/funciones?nombre=${encodeURIComponent(searchQuery.value.trim())}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      results.value = data;
      noResults.value = data.length === 0;
    } else {
      results.value = [];
      noResults.value = true;
      console.error('Failed to fetch results:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching results:', error);
    results.value = [];
    searchError.value = true;
  }
};


  return {
    funcions, searchQuery, results, noResults, searchError,
    fetchFunciones, fetchResults
  };
})
