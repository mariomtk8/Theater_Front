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
  editingSesiones?: boolean;
}

export interface Sesion {
  idSesion: number;
  fecha: string | null;
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
  const apiUrl = '/api/Funciones';
  const funciones = reactive<Funcion[]>([]);
  const sesiones = reactive<{ [key: number]: Sesion[] }>({});

  const formatarFecha = (fecha: string | undefined): string | null => {
    if (!fecha) return null;
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const convertirFechas = (funcion: Funcion) => {
    return {
      ...funcion,
      fechaUno: formatarFecha(funcion.fechaUno),
      fechaDos: formatarFecha(funcion.fechaDos),
      fechaTres: formatarFecha(funcion.fechaTres),
    };
  };

  const convertirFechasSesion = (sesion: any) => {
    return {
      idSesion: sesion.idSesion,
      fecha: formatarFecha(sesion.fecha),
      editing: false,
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

  const cargarSesiones = async (idFuncion: number) => {
    try {
      const response = await fetch(`${apiUrl}/${idFuncion}/Sesion`);
      if (!response.ok) throw new Error('Error al cargar las sesiones');
      const data = await response.json();
      sesiones[idFuncion] = data.map(convertirFechasSesion);
    } catch (error) {
      console.error('Error al cargar las sesiones:', error);
      sesiones[idFuncion] = [];
    }
  };

  const agregarNuevaSesion = async (idFuncion: number) => {
    try {
      const response = await fetch(`${apiUrl}/${idFuncion}/Sesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`Error al agregar sesión: ${response.statusText}`);
      }

      alert('Nueva sesión creada con éxito. Puede añadir la fecha editando la sesión.');

      await cargarSesiones(idFuncion);
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al crear nueva sesión: ' + error.message);
      } else {
        console.error('Error desconocido al agregar sesión:', error);
        alert('Error al crear nueva sesión: Error desconocido.');
      }
    }
  };

  const borrarSesion = async (idFuncion: number, idSesion: number) => {
    try {
      const response = await fetch(`${apiUrl}/${idFuncion}/Sesion/${idSesion}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al borrar la sesión');
      await cargarSesiones(idFuncion);
    } catch (error) {
      console.error('Error al borrar la sesión:', error);
    }
  };

  const formatFechaISO = (fecha: string): string => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const actualizarFechaSesion = async (idFuncion: number, idSesion: number, fecha: string) => {
    try {
      const formattedFecha = formatFechaISO(fecha);
      const response = await fetch(`${apiUrl}/${idFuncion}/Sesion/${idSesion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedFecha)  // Asegúrate de enviar un objeto
      });
      if (!response.ok) throw new Error(`Error al actualizar la fecha de la sesión: ${response.statusText}`);
      await cargarSesiones(idFuncion);
    } catch (error) {
      console.error('Error al actualizar la fecha de la sesión:', error);
      if (error instanceof Error) {
        alert('Error al actualizar la fecha de la sesión: ' + error.message);
      } else {
        alert('Error al actualizar la fecha de la sesión: Error desconocido.');
      }
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

  return { funciones, sesiones, cargarFunciones, guardarFuncion, actualizarFuncion, borrarFuncion, agregarNuevaSesion, cargarSesiones, borrarSesion, actualizarFechaSesion };
});