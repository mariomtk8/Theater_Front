<template>
    <section v-if="store.funcions.length > 0" class="performance-block">
      <div class="performance-block__info">
        <h2 class="performance-block__title">Recomendación</h2>
        <RouterLink :to="{ path: '/InfoFuncion/' + store.funcions[currentIndex].id }" class="performance-block__button">Comprar Entradas</RouterLink>
      </div>
      <div class="performance-block__content">
        <div class="image-container">
          <button @click="anteriorFuncion" class="left-button">Anterior</button>
          <div class="performance-block__image">
            <img :src="store.funcions[currentIndex].cartel" alt="Función de Teatro" class="image__img">
          </div>
          <button @click="siguienteFuncion" class="right-button">Siguiente</button>
        </div>
      </div>
      <div class="performance-block__name">
        <h2 class="performance-block__name-title">{{ store.funcions[currentIndex].nombre }}</h2>
        <p class="performance-block__name-text">{{ store.funcions[currentIndex].descripcion }}</p>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useProgramacion } from '../store/Programacion';
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  const store = useProgramacion()
  const currentIndex = ref(0)
  
  onMounted(() => {
      store.fetchFunciones()
  })
  
  const siguienteFuncion = () => {
    if (currentIndex.value < store.funcions.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }
  
  const anteriorFuncion = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else {
      currentIndex.value = store.funcions.length - 1
    }
  }
  </script>

<style scoped>
body,
h1,
h2,
p,
ul,
li,
a {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    color: #ffffff; 
}

body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    overflow-x: hidden; 
}

.performance-block {
    background-color: #1E3367;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px; 
    padding: 20px;
    min-height: 60vh;
}


.performance-block__info,
.performance-block__image,
.performance-block__name {
    flex: 1 1 300px; 
    padding: 10px;
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-button {
  
  display: inline-block;
    padding: 15px 30px;
    background-color: #F2A365;
    color: #000;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.2rem;
    transition: background-color 0.3s; 
    
}

.right-button {
 
  display: inline-block;
    padding: 15px 30px;
    background-color: #F2A365;
    color: #000;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.2rem;
    transition: background-color 0.3s; 
    
}
.performance-block__title,
.performance-block__name-title {
    margin-bottom: 20px;
    font-size: 2rem; 
    margin-left: 10vh;
}

.performance-block__button {
    display: inline-block;
    padding: 15px 30px;
    background-color: #F2A365;
    color: #000;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.2rem;
    transition: background-color 0.3s; 
    margin-left: 10vh;
}

.performance-block__button:hover,
.performance-block__button:focus {
    background-color: #D9894F; 
    color: #fff;
}

.performance-block__image img {
    width: 400px;
    height: auto; 
    border-radius: 10px;
}

.performance-block__name-text {
    display: block;
    text-align: justify;
    padding: 10px;
}


@media (max-width: 1100px) {
    .performance-block {
        flex-direction: column;
        align-items: center;
    }

    .performance-block__image{
        width: 350px;
    }

    .performance-block__info,
    .performance-block__name {
        text-align: center;
    }

    .performance-block__name-text {
        text-align: center;
    }
    @media (max-width: 600px) {
    .performance-block {
      flex-direction: column;
      align-items: center;
    }

    .performance-block__info,
    .performance-block__name {
      text-align: center;
    }
    .performance-block__image img{
        width: 288px;
    }

    .image-container {
      flex-direction: column;
      align-items: center;
    }

    .left-button,
    .right-button {
      margin: 10px 0;
    }
  }
}
</style>