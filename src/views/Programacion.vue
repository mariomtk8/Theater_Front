<template>
    <body>
        <main class="main">
            <div class="main-block">
                <h1>Programación</h1>
            </div>
            <section class="poster-container">
                <div v-for="funcion in funcions" :key="funcion.id" class='show-poster'>
                    <div class='show-poster__image'>
                        <img :src="funcion.imagenesArray && funcion.imagenesArray.length > 0 ? funcion.imagenesArray[0] : 'imagen-predeterminada.jpg'"
                            alt="Imagen de la funcion" />
                    </div>
                    <div class='show-poster__details'>
                        <h3 class='show-poster__details__title'>{{ funcion.nombre }}</h3>
                        <RouterLink :key="funcion.id" :to="{ path: '/InfoFuncion/' + funcion.id }" class='show-poster__button'>Comprar
                            Entradas</RouterLink>
                    </div>
                </div>
            </section>
        </main>
    </body>
</template>

  
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

interface Funcion {
  nombre?: string;
  imagenesArray?: string[];
  id?: string;
}

const funcions = ref<Funcion[]>([]);

const fetchFunciones = async () => {
  try {
    const response = await fetch('/api/funciones/');
    if (!response.ok) {
      throw new Error('Error al obtener los datos de las funciones');
    }
    const data = await response.json();
    funcions.value = data;
    console.log("Funciones cargadas:", funcions.value); // Depuración adicional
  } catch (error) {
    console.error('Error al obtener los datos de las funciones:', error);
  }
};

onMounted(() => {
  fetchFunciones();
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

body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
}
.main-block h1 {
    margin-left: 6vh;
    color: white;
}

.performance-block {
    background-color: #1E3367;
    display: flex;
    align-items: center;
    min-height: 60vh;
}

.performance-block__info {
    flex: 0.7;
    text-align: center;
    margin-bottom: 10vh;
}

.performance-block__title {
    color: #ffffff;
    margin-bottom: 5vh;
    font-size: xxx-large;
}

.performance-block__button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #ffffff;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    font-size: x-large;
}

.performance-block__image {
    flex: 0.7;
    text-align: center;
}

.performance-block__image img {
    width: 350px;
}

.performance-block__name {
    flex: 1;
    text-align: left;
    align-self: start;
    margin-top: 10vh;
}

.performance-block__name-title {
    font-size: xx-large;
    color: white;
    margin-bottom: 5vh;
}

.performance-block__name-text {
    color: white;
    text-align: center;
}

.title-posters {
    display: flex;
    justify-content: center;
    margin: 7vh;
}

.title-posers_txt {
    font-size: xx-large;
}

.poster-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    background-color: white;
    padding: 20px;
    margin: 0 auto; 
    gap: 20px; 
    max-width: 1200px;
}

.show-poster {
    text-align: center;
    background-color: #1E3367;
    padding: 20px;
    width: 264px; 
    height: 420px; 
    border: #ffffff 2px solid;
    box-sizing: border-box;
    margin-bottom: 20px; 
}

.show-poster__image {
    margin-bottom: 10px;
}

.show-poster__image img {
    width: 100%;
    height: 20vh;
}

.poster__img {
    height: 300px;
    width: 100%;

}

.show-poster__details {
    color: white; 
    margin-bottom: 3vh;
    padding: 20px;  
    border-top: 2px solid white;
}

.show-poster__button {
    padding: 12px 24px; /* Aumenta el relleno para un botón más grande */
    background-color: #ffffff; /* Color de fondo del botón */
    color: #1E3367; /* Color del texto del botón */
    cursor: pointer;
    border: none; /* Elimina el borde del botón */
    border-radius: 5px; /* Añade bordes redondeados */
    transition: background-color 0.3s, color 0.3s;
}
.show-poster__button:hover {
    background-color: #1E3367; 
    color: #ffffff;
}



@media screen and (max-width: 1150px) {
    .performance-block {
        display: flex;
        flex-direction: column;
    }

    .performance-block__name {
        display: none;
    }

    .main-block h1 {
        margin-left: 6vh;
    }

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title-posters {
        flex-direction: column;
        align-items: center;
        margin: 2vh;
    }

    .title-posers_txt {
        font-size: x-large;
    }

    .poster-container {
        flex-direction: column;
        align-items: center;
    }

    .show-poster {
        margin-bottom: 7vh;
    }

    .poster-container img {
        margin-bottom: 10px;
    }

    .show-poster {
        padding: 15px;
    }

    .show-poster__image {
        margin-bottom: 10px;
    }
}
</style>
