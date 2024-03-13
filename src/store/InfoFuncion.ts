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
            const response = await fetch(`http://a3407cd44c6db427eb6fd4e572e5b3ab-889807298.us-east-1.elb.amazonaws.com/funciones/${idfuncion}`);
            if (!response.ok) {
                
                throw new Error(`Error al obtener los datos de la obra: status ${response.status}`);
            }
            const data: Funcion = await response.json();
            if (data.fechaUno) data.fechaUno = formatarFecha(data.fechaUno);
            if (data.fechaDos) data.fechaDos = formatarFecha(data.fechaDos);
            if (data.fechaTres) data.fechaTres = formatarFecha(data.fechaTres);
            funcion.value = data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        } finally {
            isLoading.value = false;
        }
    };

    // Función para formatear la fecha
    const formatarFecha = (fecha: string): string => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDate;
    };

    return {
        funcion,
        fetchFunciones,
        isLoading,
        error
    };
});