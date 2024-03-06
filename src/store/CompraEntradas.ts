import { defineStore } from 'pinia';
import { ref,reactive, nextTick } from 'vue';
import { useRoute } from 'vue-router';

interface Funcion {
  nombre: string;
  descripcion: string;
  imagenes: string;
  id: string;
}

interface Asiento {
  idAsiento: number;
  isFree: boolean;
  precio : number;
}
interface AsientoOcupado {
  idAsiento: number;
}

export const useFuncionesStore = defineStore('funciones', () => {
  const storeObras = reactive<Funcion[]>([]);
  const funcion = ref<Funcion | null>(null);
  const asientos = reactive<Asiento[]>([]);
  const AsientosContainer = ref<HTMLElement | null>(null);
  const asientosSeleccionados = reactive<Asiento[]>([]);
  const  asientosOcupados = reactive<AsientoOcupado[]>([]);
  const route = useRoute();

  async function cargarAsientosOcupados(idFuncion: string, idSesion: string) {
    console.log(`Cargando asientos ocupados para función: ${idFuncion}, sesión: ${idSesion}`);
    try {
      const respuesta = await fetch(`/api/Funciones/${idFuncion}/Sesion/${idSesion}`);
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

  async function cargarTodosLosAsientos() {
    console.log('Cargando todos los asientos...');
    try {
      const respuesta = await fetch(`/api/Asientos`);
      if (!respuesta.ok) {
        throw new Error('Error al obtener todos los asientos');
      }
      const data = await respuesta.json();
      asientos.splice(0, asientos.length, ...data.map((asiento: any) => ({
        idAsiento: asiento.idAsiento,
        isFree: !asientosOcupados.some(ocupado => ocupado.idAsiento === asiento.idAsiento),
        precio: asiento.precio
      })));
    } catch (error) {
      console.error('Error al obtener todos los asientos:', error);
    }
  }

  async function comprarAsientos(asientosParaComprar: Asiento[], idFuncion: string, idSesion: string) {
    try {
      const idAsientos = asientosParaComprar.map(asiento => asiento.idAsiento);
      const compra = {
        asientos: idAsientos
      };
      const url = `/api/Funciones/${idFuncion}/Sesion/${idSesion}/ReservarAsiento`;
      const respuesta = await fetch(url, {
        method: 'POST',
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
      await cargarTodosLosAsientos();
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  }
  async function resetearYRecargarAsientos(idFuncion: string, idSesion: string) {
    asientosOcupados.splice(0, asientosOcupados.length); 
    await cargarAsientosOcupados(idFuncion, idSesion);
    await cargarTodosLosAsientos();
  }

  return { funcion, asientos,storeObras,resetearYRecargarAsientos, AsientosContainer, asientosSeleccionados, cargarAsientosOcupados, cargarTodosLosAsientos, comprarAsientos};
});
