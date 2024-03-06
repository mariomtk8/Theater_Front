import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface Funcion {
  nombre: string;
  descripcion: string;
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
  const apiUrl = '/api/Funciones'; 
  const funciones = reactive<Funcion[]>([]);
  
  const convertirFechas = (funcion: Funcion) => {
    return {
      ...funcion,
      fechaUno: funcion.fechaUno ? new Date(funcion.fechaUno).toISOString() : null,
      fechaDos: funcion.fechaDos ? new Date(funcion.fechaDos).toISOString() : null,
      fechaTres: funcion.fechaTres ? new Date(funcion.fechaTres).toISOString() : null,
    };
  };

  const cargarFunciones = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Error al cargar las funciones');
      const data = await response.json();
      funciones.splice(0, funciones.length, ...data);
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
