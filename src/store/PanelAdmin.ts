import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface Funcion {
  nombre: string;
  descripcion: string;
  imagenes: string;
  actores?: string;
  autores?: string;
  fechaUno?: string;
  fechaDos?: string;
  fechaTres?: string;
  duracion: number;
  cartel: string;
  id: number; 
  editing?: boolean; 
}
export interface FuncionDos {
  nombre: string;
  descripcion: string;
  imagenes: string;
  actores?: string;
  autores?: string;
  fechaUno?: string;
  fechaDos?: string;
  fechaTres?: string;
  duracion: number;
  cartel: string;
  id: number;  
}

export const useFuncionesStore = defineStore('funcionesStore', () => {
  const apiUrl = 'http://a3407cd44c6db427eb6fd4e572e5b3ab-889807298.us-east-1.elb.amazonaws.com/Funciones'; 
  const funciones = reactive<Funcion[]>([]);
  
  const convertirFechas = (funcion: Funcion) => {
    const formatarFecha = (fecha: string | undefined): string | null => {
      if (!fecha) return null;
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
  
    return {
      ...funcion,
      fechaUno: formatarFecha(funcion.fechaUno),
      fechaDos: formatarFecha(funcion.fechaDos),
      fechaTres: formatarFecha(funcion.fechaTres),
    };
  };

  const cargarFunciones = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Error al cargar las funciones');
      const data = await response.json();
      funciones.splice(0, funciones.length, ...data.map((funcion: Funcion) => convertirFechas(funcion)));
    } catch (error) {
      console.error('Error al cargar las funciones:', error);
    }
  };

  const guardarFuncion = async (funcion: FuncionDos) => {
    const funcionParaGuardar = convertirFechas(funcion);
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionParaGuardar),
        });

        if (!response.ok) {
            throw new Error('Error al guardar la función: ' + response.statusText);
        }

        await cargarFunciones();
    } catch (error) {
        console.error('Error al guardar la función:', error);
    }
};

  const actualizarFuncion = async (funcion: Funcion) => {
    const funcionParaActualizar = convertirFechas(funcion);
    try {
      const response = await fetch(`${apiUrl}/${funcion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionParaActualizar),
      });
      if (!response.ok) throw new Error('Error al actualizar la función');
      await cargarFunciones();
    } catch (error) {
      console.error('Error al actualizar la función:', error);
    }
  };

  const borrarFuncion = async (id: number) => { 
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la función');
      await cargarFunciones();
    } catch (error) {
      console.error('Error al borrar la función:', error);
    }
  };

  return { funciones, cargarFunciones, guardarFuncion, actualizarFuncion, borrarFuncion };
});
