<template>
    <main>
      <article class="article-block">
        <div class="main-block">
          <h1>Compra de entradas</h1>
        </div>
        <section class="frame-function" v-if="funcion">
          <div class="frame-function__poster">
            <img :src=funcion.imagenesArray[0] alt="Imagen de la obra">
          </div>
          <div class="frame-function__title">
            <h2>{{ funcion.nombre }}</h2>
          </div>
        </section>
      </article>
      <div class="asientos-container">
      <svg v-if="asientos.length > 0" style="width: 500px; height: 500px;">
        <rect v-for="(asiento, index) in asientos" :key="asiento.id"
              :x="asiento.x" :y="asiento.y" width="20" height="20"
              :fill="asiento.ocupado ? 'red' : 'green'"
              style="cursor: pointer;" />
      </svg>
    </div>
      <p id="total-price">Precio Total: 0 €</p>
      <button id="buy-button" @click="postEntradas">Comprar</button>
    </main>
  </template>
  
    
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  interface Funcion {
    nombre: string;
    descripcion: string;
    imagenesArray: string[];
    actoresArray: string[];
    fechasArray: string[];
    id: string;
  }
  
  const funcion = ref<Funcion | null>(null);
  
  onMounted(async () => {
    const route = useRoute();
    const idFuncion = route.params.Id as string;
    try {
      const response = await fetch('/api/funciones/' + idFuncion);
      if (!response.ok) throw new Error('Error al obtener los datos de la obra');
      funcion.value = await response.json();
    } catch (error) {
      console.error('Error al obtener los datos de la obra:', error);
    }
  });
  
  
  const postEntradas = async () => {
    if (!funcion.value) {
      alert('No se ha seleccionado ninguna obra.');
      return;
    }
    const route = useRoute();
    const fecha = route.params.idFecha as string;
    const url = `api/Asientos/${fecha}`;
    const data = {
      asientos: [],
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Error al realizar la compra');
      const responseData = await response.json();
      alert('Compra realizada');
  
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error en la compra');
    }
  };
  const asientos = ref([]);

  onMounted(async () => {
    const route = useRoute();
    const idFuncion = route.params.Id as string;
    try {
        // Petición para los detalles de la función
        const responseFuncion = await fetch('/api/funciones/' + idFuncion);
        if (!responseFuncion.ok) throw new Error('Error al obtener los datos de la obra');
        funcion.value = await responseFuncion.json();

        // Petición GET para obtener los asientos
        const responseAsientos = await fetch(`/api/asientos/${idFuncion}`);
        if (!responseAsientos.ok) throw new Error('Error al obtener los asientos');
        asientos.value = await responseAsientos.json();
    } catch (error) {
        console.error('Error:', error);
    }
});
  </script>
    
  <style>
  body,
  h1,
  h2,
  p,
  ul,
  li,
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  
  
  .article-block {
    display: flex;
    justify-content: right;
    margin-top: 10vh;
    flex-direction: column;
  }
  
  .main-block {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    background-color: #1E3367;
    height: 13vh;
    margin-bottom: 10vh;
  }
  
  .main-block h1 {
    color: white;
    font-size: xx-large;
    margin-left: 20vh;
  }
  
  /* Estilos del marco de la función */
  .frame-function {
    display: flex;
    align-items: center;
    background-color: #1E3367;
    width: 800px;
    height: 450px;
    text-align: center;
    max-width: 977px;
    margin: auto;
  }
  
  .frame-function__poster {
    flex: 1;
  }
  
  .frame-function__poster img {
    width: 280px;
  }
  
  .frame-function__title {
    flex: 1;
  }
  
  .frame-function__title h2 {
    font-size: 30px;
    color: white;
  }
  
  /* Estilos del contenedor */
  #container {
    text-align: center;
  }
  
  h2 {
    color: #333;
  }
  
  .container-frame {
    margin-top: 20px;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button {
    margin-left: 10px;
  }
  
  section {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15vh;
  }
  
  .container {
    text-align: center;
  }
  
  /* Estilos para el contenedor de los asientos */
  #asientos {
    text-align: center;
    margin: 20px auto;
  }
  
  /* Estilos para las filas de asientos */
  .row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  /* Estilos para cada asiento */
  .seat {
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: #bdc3c7;
    border-radius: 3px;
    /* Opcional: para asientos redondeados */
    display: block;
    cursor: pointer;
  }
  
  /* Estilos para asientos seleccionados */
  .seat.selected {
    background-color: #3498db;
  }
  
  .seat {
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: #bdc3c7;
    border-radius: 3px;
    /* Opcional: para asientos redondeados */
    display: block;
    cursor: pointer;
  }
  
  
  
  .seat.comprado {
    background-color: #ff0000;
    
    cursor: not-allowed;
   
  }
  
  
  /* Estilos para el texto del precio total */
  #total-price {
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
  }
  
  /* Estilos para el botón de compra */
  #buy-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #1E3367;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  /* Estilos del pie de página */
  .footer {
    margin-top: 10vh;
    display: flex;
    align-items: center;
    background-color: #1E3367;
    text-align: center;
    width: 100%;
    height: 25vh;
  }
  
  .footer__logo {
    flex: 0.7;
    text-align: right;
  }
  
  .footer__menu {
    flex: 1;
    text-align: center;
  }
  
  .footer__menu a {
    color: white;
    margin-right: 2vh;
  }
  
  .footer__networks {
    flex: 0.7;
    text-align: left;
  }
  
  .footer__logo img {
    width: 90px;
    border-radius: 70px;
  }
  
  .footer__networks img {
    width: 40px;
    margin-right: 4vh;
  }
  </style>
  