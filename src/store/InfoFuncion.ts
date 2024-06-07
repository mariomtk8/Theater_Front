import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Funcion {
    nombre: string;
    descripcion: string;
    imagenes?: string;
    actores?: string;
    id: string;
}

interface Sesion {
    idSesion: number;
    fecha: string;
}

interface Asiento {
    idAsiento: number;
    estado: string;
}

export const useFetchFuncion = defineStore('listadoObrasFuncion', () => {
    const funcion = ref<Funcion | null>(null);
    const sesiones = ref<Sesion[]>([]);
    const sesion = ref<Sesion | null>(null);
    const asientosOcupados = ref<{ [key: number]: number[] }>({});
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchFunciones = async (idfuncion: string) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch(`/api/funciones/${idfuncion}`);
            if (!response.ok) {
                throw new Error(`Error al obtener los datos de la obra: status ${response.status}`);
            }
            const data: Funcion = await response.json();
            funcion.value = data;
            await fetchSesiones(idfuncion);
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        } finally {
            isLoading.value = false;
        }
    };

    const fetchSesiones = async (idfuncion: string) => {
        try {
            const response = await fetch(`/api/funciones/${idfuncion}/Sesion`);
            if (!response.ok) {
                throw new Error(`Error al obtener las sesiones: status ${response.status}`);
            }
            const data: Sesion[] = await response.json();
            sesiones.value = data.map(sesion => ({
                ...sesion,
                fecha: formatarFecha(sesion.fecha)
            }));
            await Promise.all(data.map(s => fetchAsientosOcupados(idfuncion, s.idSesion.toString())));
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        }
    };

    const fetchSesionById = async (idfuncion: string, idSesion: string) => {
        try {
            const response = await fetch(`/api/funciones/${idfuncion}/Sesion/${idSesion}`);
            if (!response.ok) {
                throw new Error(`Error al obtener la sesión: status ${response.status}`);
            }
            const data: Sesion = await response.json();
            sesion.value = {
                ...data,
                fecha: formatarFecha(data.fecha)
            };
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        }
    };

    const fetchAsientosOcupados = async (idfuncion: string, idSesion: string) => {
        try {
            const response = await fetch(`/api/funciones/${idfuncion}/Sesion/${idSesion}`);
            if (!response.ok) {
                throw new Error(`Error al obtener los asientos ocupados: status ${response.status}`);
            }
            const data = await response.json();
            asientosOcupados.value[parseInt(idSesion)] = data.asientosOcupados;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        }
    };

    const formatarFecha = (fecha: string): string => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    return {
        funcion,
        sesiones,
        sesion,
        asientosOcupados,
        fetchFunciones,
        fetchSesiones,
        fetchSesionById,
        fetchAsientosOcupados,
        isLoading,
        error
    };
});
