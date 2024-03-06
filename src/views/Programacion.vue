<template>
    <body>
        <main class="main">
            <div class="main-block">
                <h1>Programación</h1>
            </div>
            <CartelIA></CartelIA>
        </main>
    </body>
</template>

<script setup lang="ts">
import CartelIA from '@/components/Cartel-IA.vue';
</script>


<style scoped >
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
.main-block {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    background-color: #1E3367;
    height: 13vh;
    margin-bottom: 10vh;
}

.main-block h1{
    color: white;
    font-size: xx-large;
    margin-left: 20vh;
}

.performance-block {
    background-color: #1E3367;
    display: flex;
    align-items: center;
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
.show-poster__image img {
        width: 400px;
    height: auto;
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
