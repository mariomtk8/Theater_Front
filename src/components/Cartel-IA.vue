<template>
    <section class="poster-container">
                <div v-for="funcion in store.funcions" :key="funcion.id" class='show-poster'>
                    <div class='show-poster__image'>
                        <img :src="funcion.imagenes ? funcion.imagenes.split(',')[0] : 'imagen-predeterminada.jpg'"
                            alt="Imagen de la funcion" />
                    </div>
                    <div class='show-poster__details'>
                        <h3 class='show-poster__details__title'>{{ funcion.nombre }}</h3>
                    </div>
                    <div class="show-poster__button">
                        <RouterLink :key="funcion.id" :to="{ path: '/InfoFuncion/' + funcion.id }" class='show-poster__button_ref'>Comprar
                            Entradas</RouterLink>
                    </div>
                </div>
            </section>
</template>

<script setup lang="ts">
    import { useProgramacion } from '../store/Programacion';
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
const store = useProgramacion()

onMounted(() => {
    store.fetchFunciones()
})
</script>

<style scoped>
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
    height: auto; 
    border: #ffffff 2px solid;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
}

.show-poster__image img {
    width: 100%;
    height: 30vh; 
    max-height: 300px; 
    object-fit: cover; 
}

.show-poster__details {
    color: white;
    padding: 20px;
    border-top: 2px solid white;
    transition: transform 0.3s ease; 
}

.show-poster__button {
    padding: 12px 24px;
    background-color: #ffffff;
    color: #1E3367;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s; 
}

.show-poster__button:hover {
    background-color: #1E3367;
    color: #ffffff;
}
</style>