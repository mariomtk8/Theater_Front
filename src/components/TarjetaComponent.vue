<template>
  <div class="contenedor">
    <div v-for="(compra, index) in compras" :key="index" class="tarjeta">
      <h2 class="titulo">Detalles de la Compra {{ index + 1 }}</h2>
      <div class="detalle-compra">
        <p v-if="compra.butacasSeleccionadas && compra.butacasSeleccionadas.length > 0">
          <strong class="Butacas">Butacas Compradas:</strong> {{ compra.butacasSeleccionadas.join(', ') }}
        </p>
        <p><strong class="Butacas">Sesión:</strong> {{ compra.idSesion }}</p>
        <div class="horarios" v-if="store.sesion">
          <p>
            Fecha de la Sesión: {{ store.sesion.fecha }}
          </p>
          <p>
            Función: {{ store.funcion?.nombre }}
          </p>
        </div>
        <div class="imprimir">
          <button @click="imprimirPDF(compra)" class="nav__link">Imprimir PDF</button>
          <RouterLink to="/Programacion" class="nav__link">Comprar más entradas</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetchFuncion } from '../store/InfoFuncion';
import jsPDF from 'jspdf';

const store = useFetchFuncion();
const route = useRoute();
const router = useRouter();
const idSesion = computed(() => route.query.idSesion ? route.query.idSesion as string : '');
const emit = defineEmits(['nuevaCompra']);

onMounted(async () => {
    await nextTick();
    const idfuncion = route.params.Id as string;
    if (idfuncion) {
        await store.fetchFunciones(idfuncion);
        if (idSesion.value) {
            await store.fetchSesionById(idfuncion, idSesion.value);
        }
    } else {
        console.error('ID de función no encontrado en la ruta.');
    }
});

// Array para almacenar los detalles de todas las compras realizadas
const compras = ref<Array<{ butacasSeleccionadas: number[], idSesion: string }>>([]);

onMounted(() => {
  obtenerDatosDesdeURL();
});

const obtenerDatosDesdeURL = () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const butacas = urlParams.getAll('butacasSeleccionadas').flatMap(value => value.split(',')).map(Number);
  const idSesion = route.query.idSesion ? route.query.idSesion as string : '';
  const nuevaCompra = { butacasSeleccionadas: butacas, idSesion: idSesion };
  compras.value.push(nuevaCompra);

  
  emit('nuevaCompra', nuevaCompra); 
};

const irAProgramacion = () => {
  router.push('/programacion');
};

const imprimirPDF = (compra: { butacasSeleccionadas: number[], idSesion: string }) => {
  
  if (store.funcion) {
    // Crear un nuevo documento jsPDF con tamaño de página personalizado
    const doc = new jsPDF({
      orientation: 'portrait', 
      unit: 'mm', 
      format: 'a4' 
    });

    
    doc.setFontSize(20);
    doc.setTextColor("#1a237e"); 
    doc.text("Tu Entrada", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" }); 

    
    doc.setFontSize(14); 
    doc.setTextColor("#000000"); 

    
    let y = 40; 
    doc.text(`Butacas: ${compra.butacasSeleccionadas.join(', ')}`, doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 10; 
    doc.text(`Sesión: ${compra.idSesion}`, doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    
   
    if (store.sesion) {
      y += 10; 
      doc.text(`Fecha de la Sesión: ${store.sesion.fecha}`, doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    }
    if (store.funcion) {
      y += 10; 
      doc.text(`Funcion: ${store.funcion.nombre}`, doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    }

    doc.setFontSize(10); 
    doc.text("Gracias por utilizar nuestros Servicios ", doc.internal.pageSize.getWidth() / 2, 80, { align: "center" });

    const pdfBlob = doc.output('blob');

   
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl);

    URL.revokeObjectURL(pdfUrl);
  } else {
    console.error('No se pudo obtener la información de la función.');
  }
};
</script>


<style scoped>
/* Estilos para la tarjeta */
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.imprimir{
  display: flex;
  flex-direction: column;
}

.tarjeta {
  width: 450px;
  background-color: #f9f9f9;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.Butacas {
  font-size: 30px;
  color: #555555;
  margin-bottom: 20px;
}

.titulo {
  color: #91891f;
  font-size: 40px;
  margin-bottom: 20px;
}

.detalle-compra p {
  margin-bottom: 20px;
  font-size: 24px;
}

.detalle-compra strong {
  color: #333333;
}

.horarios {
  margin-bottom: 30px;
}

.nav__link {
  padding: 15px 30px;
  font-size: 20px;
  cursor: pointer;
  background-color: #1E3367;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav__link:hover {
  background-color: #40578b;
}
</style>