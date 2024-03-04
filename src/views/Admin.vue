<template>
    <div class="margen-Boton">
        <RouterLink to="Admin/PanelAdmin"><button class="Boton-Admin">Panel de Administrador</button></RouterLink>
    </div>
    <Section1></Section1>
    <article>
        <CartelIA></CartelIA>
    </article>
</template>
<script setup lang="ts">
    import Section1 from '../components/Section1.vue'
    import CartelIA from '@/components/Cartel-IA.vue';
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
    text-decoration: none;
}

body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
}
    .margen-Boton{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .Boton-Admin{
        height: 80px;
        width: 250px;
        margin-top: 6vh;
        background-color: #1E3367;
        color: white;
        border-radius: 15px;
        cursor: pointer;
    }

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
.performance-block {
    background-color: #1E3367;
    display: flex;
    align-items: center;
    margin-top: 10vh;
}

.performance-block__info {
    flex: 0.7;
    text-align: center;
    margin-bottom: 10vh;
}

.performance-block__title {
    color: #000000;
    margin-bottom: 5vh;
    font-size: xxx-large;
}

.performance-block__button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #fffefe ;
    color: #000000 ;
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
        justify-content: center;
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