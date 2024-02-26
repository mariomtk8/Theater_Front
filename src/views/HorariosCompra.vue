
<template>
    <main>
      <section class="main-block">
        <h1 class="main-block__title">Compra de entradas</h1>
      </section>
  
      <section class="frame-function" v-if="funcions">
        <div class="frame-function__poster">
          <img :src="funcions.imagenesArray[0]" alt="Imagen de la obra" v-if="funcions.imagenesArray.length > 0" />
        </div>
        <div class="frame-function__title">
          <h2 class="frame-function__title-text">{{ funcions.nombre }}</h2>
        </div>
      </section>
  
      <div id="container" class="information-container">
        <h2 class="information-title">Información de Fechas y Horas</h2>
        <div class="container-frame">
          <ul class="horarios-txt__list">
            <li v-for="(fecha, index) in funcions?.fechasArray" :key="fecha" class='horarios-txt__item'>
              {{ fecha }}
              <RouterLink :to="{
                path: '/CompraEntradas/' + funcions?.id,
                query: { idFecha: funcions?.nombre + (index + 1).toString() }
              }" class="show-poster__button">Comprar</RouterLink>
            </li>
          </ul>
  
        </div>
      </div>
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
  
  const funcions = ref<Funcion | null>(null);


const fetchFunciones = async (idfuncion: string) => {
    try {
        const response = await fetch(`/api/funciones/${idfuncion}`);
        if (response.ok) {
            const data: Funcion = await response.json();
            funcions.value = data;
        } else {
            console.error('Error al obtener los datos de la obra');
        }
    } catch (error) {
        console.error('Error en la solicitud fetch:', error);
    }
}

onMounted(() => {

    const route = useRoute();
    const idfuncion = route.params.Id as string; 
    if (idfuncion) {
console.log(idfuncion);

        fetchFunciones(idfuncion);
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
  
  /* Estilos generales del cuerpo */
  body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
  }
  
  /* Estilos del bloque principal */
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
  
  /* .show-poster__button {
    background-color: #1E3367 ;
    color: #e9e3e3 ;
    border: none ;
    font-size: 16px ;
    margin-left: 10px ;
  }
   */
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

  .information-title{
    margin: 5vh;
    font-size: 30px;
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
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button {
    margin-left: 10px;
  }
  
  .horario {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 900px;
    margin: auto;
  }
  
  .fecha,
  .hora,
  .disponibilidad {
    flex: 1;
  }
  
  .boton-comprar {
    background-color: #1E3367;
    color: white;
    padding: 8px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 4px;
  }
  
  .boton-comprar:hover {
    background-color: #45a049;
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
  
  @media screen and (max-width: 1150px) {
  
  
    .header {
      margin-top: 5vh;
      display: flex;
      height: auto;
      text-align: center;
      margin-bottom: 5vh;
    }
  
    .header__logo {
      margin-left: 5vh;
    }
  
    .header__nav {
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
    }
  
    main {
      margin: 0 15px;
    }
  
    .frame-function {
      display: flex;
      flex-direction: column;
      width: auto;
      height: 500px;
    }
  
    .footer {
      display: flex;
      justify-content: center;
    }
  
    .footer__logo {
      text-align: center;
    }
  
    .footer__menu {
      display: flex;
      flex-direction: column;
    }
  
    .footer__networks {
      display: flex;
      flex-direction: column;
    }
  
    .main-block h1 {
      margin-left: 6vh;
    }
  }
  </style>
  