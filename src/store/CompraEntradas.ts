import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

interface Funcion {
  nombre: string;
  descripcion: string;
  fechaUno?: string;
  fechaDos?: string;
  fechaTres?: string;
  imagenes: string;
  id: string;
}

interface Asiento {
  idAsiento: number;
  precio: number;
}

interface AsientoOcupado {
  idAsiento: number;
}

export const useFuncionesStore = defineStore('funciones', () => {
  const storeObras = reactive<Funcion[]>([]);
  const funcion = ref<Funcion | null>(null);
  const asientos = reactive<Asiento[]>([]);
  const AsientosContainer = ref<HTMLElement | null>(null);
  const asientosSeleccionados = reactive<number[]>([]);
  const asientosOcupados = reactive<AsientoOcupado[]>([]);
  const route = useRoute();

  async function cargarAsientosOcupados(idFuncion: string, idSesion: string) {
    console.log(`Cargando asientos ocupados para función: ${idFuncion}, sesión: ${idSesion}`);
    try {
      const respuesta = await fetch(`/api/Funciones/${idFuncion}/Sesion/${idSesion}/AsientosDisponibles`);
      if (respuesta.ok) {
        const data = await respuesta.json();
        asientosOcupados.splice(0, asientosOcupados.length, ...data.map((idAsiento: number) => ({ idAsiento })));
      } else if (respuesta.status === 404) {
        asientosOcupados.splice(0, asientosOcupados.length);
      } else {
        throw new Error('Error al obtener asientos ocupados');
      }
    } catch (error) {
      console.error('Error al obtener asientos ocupados:', error);
    }
  }

  async function cargarTodosLosAsientos(idFuncion: string, idSesion: string) {
    console.log('Cargando todos los asientos...');
    try {
      const totalAsientos = 40;
      asientos.splice(0, asientos.length, ...Array.from({ length: totalAsientos }, (_, i) => ({
        idAsiento: i + 1,
        precio: 10
      })));
    } catch (error) {
      console.error('Error al obtener todos los asientos:', error);
    }
  }

  async function comprarAsientos(asientosParaComprar: number[], idFuncion: string, idSesion: string) {
    try {
      const compra = {
        asientos: asientosParaComprar
      };
      const url = `/api/Funciones/${idFuncion}/Sesion/${idSesion}/ReservarAsiento`;
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compra),
      });
      if (!respuesta.ok) {
        throw new Error('Error en la compra de asientos');
      }
      console.log('Compra realizada con éxito');
  
      await cargarAsientosOcupados(idFuncion, idSesion);
      await cargarTodosLosAsientos(idFuncion, idSesion);
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  }

  async function resetearYRecargarAsientos(idFuncion: string, idSesion: string) {
    asientosOcupados.splice(0, asientosOcupados.length); 
    await cargarAsientosOcupados(idFuncion, idSesion);
    await cargarTodosLosAsientos(idFuncion, idSesion);
  }

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

  const formatarFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  return {
    funcion,
    asientos,
    storeObras,
    fetchFunciones,
    resetearYRecargarAsientos,
    AsientosContainer,
    asientosSeleccionados,
    asientosOcupados, 
    cargarAsientosOcupados,
    cargarTodosLosAsientos,
    comprarAsientos
  };
});
