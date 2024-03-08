import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

interface Funcion {
    nombre: string;
    descripcion: string;
    imagenes?: string;
    actores?: string;
    fechaUno?: string;
    fechaDos?: string;
    fechaTres?: string;
    id: string;
}

export const useFetchFuncion = defineStore('listadoObrasFuncion', () => {
    const funcion = ref<Funcion | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchFunciones = async (idfuncion: string) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch(`http://localhost:8001/funciones/${idfuncion}`);
            if (!response.ok) {
                
                throw new Error(`Error al obtener los datos de la obra: status ${response.status}`);
            }
            const data: Funcion = await response.json();
            funcion.value = data;
        } catch (err) {
            
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        funcion,
        fetchFunciones,
        isLoading,
        error
    };
});