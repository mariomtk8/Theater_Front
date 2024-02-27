<template>
    <div>
        <main>
            <div class="main-block">
                <h1 class="main-block__title">{{ funcions?.nombre }}</h1>
            </div>
            <section class="horarios" v-if="funcions && funcions.imagenesArray && funcions.imagenesArray.length > 0">
                <div class="horarios-img">
                    <img :src="funcions.imagenesArray[0]" alt="Imagen destacada de la funcion" />
                </div>
                <div class="horarios-txt">
                    <h2 class="horarios-txt__title">Horarios de la función</h2>
                    <ul class="horarios-txt__list">
                        <li v-for="horario in funcions?.fechasArray" :key="horario" class="horarios-txt__item">{{ horario }}
                        </li>
                    </ul>
                </div>
            </section>
            <div class="primera-img" v-if="funcions && funcions.imagenesArray && funcions.imagenesArray.length > 1">
                <img :src="funcions.imagenesArray[1]" alt="Imagen destacada de la funcion" />
            </div>
            <article>
                <div class="button-bought" id="boton-comprar">
                    <RouterLink :to="{ path: '/HorariosCompra/' + funcions?.id }" class='show-poster__button'>Comprar Entradas
                    </RouterLink>
                </div>
            </article>
            <section>
                <div class="frame-information">
                    <div class="frame-information__title">
                        <h2>Información de la función</h2>
                    </div>
                    <div class="frame-information__txt">
                        <p>{{ funcions?.descripcion }}</p>
                    </div>
                </div>
                <div class="frame-repart">
                    <div class="frame-repart__title">
                        <h2>Reparto</h2>
                    </div>
                    <div class="frame-repart__txt">
                        <ul class="frame-repart__list">
                            <li v-for="actor in funcions?.actoresArray" :key="actor" class="frame-repart__item">{{ actor }}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    </div>
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

body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
}

/*---------Header--------*/

.main-block {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    background-color: #1E3367;
    height: 13vh;
    margin-bottom: 10vh;
}

.main-block__title {
    color: white;
    font-size: xx-large;
    margin-left: 20vh;
}

.horarios {
    display: flex;
    align-items: center;
    align-content: center;
    width: 100%;
    margin-bottom: 5vh;
}

.horarios-img {
    flex: 1;
    text-align: center;
}

.horarios-img img {
    width: 500px;
}



.horarios-txt {
    flex: 1;
    text-align: center;
}

.horarios-txt__title {
    font-size: xxx-large;
    margin-bottom: 3vh;
}

.horarios-txt__list,
.horarios-txt__item {
    font-size: xx-large;
    list-style-position: inside;
}

.primera-img {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 5vh;
}

.primera-img img {
    max-width: 100vh;
}

.segunda-img {
    display: flex;
    justify-content: left;
    margin-left: 20vh;
    margin-bottom: 5vh;
}

.segunda-img__image {
    width: 700px;
}

article {
    display: flex;
    justify-content: right;
    margin-top: 10vh;
}

.button-bought {
    background-color: #1E3367;
    border-radius: 32px;
    display: flex;
    width: 47vh;
    height: 8vh;
    margin-right: 30vh;
    justify-content: center;
    align-items: center;
    margin-bottom: 10vh;
}

.button-bought__link {
    color: white;
    font-size: x-large;
}

.show-poster__button {
    padding: 10px 20px;
    background-color: #ffffff;
    color: #1E3367;
    cursor: pointer;
}

.frame-information {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;
}

.frame-information__title {
    position: relative;
    margin-bottom: 25px;
    color: #000000;
    font-size: 20px;
}

.frame-information__title h2::after {
    content: "";
    width: 100%;
    position: absolute;
    height: 2px;
    display: block;
    margin: 0 auto;
    background-color: #000000;
}

.frame-information__txt {
    margin-top: 3vh;
    margin-bottom: 5vh;
    font-size: 20px;
}

.frame-repart {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: auto;
}

.frame-repart__title {
    font-size: 20px;
}

.frame-repart__item {
    list-style-position: inside;
    font-size: 20px;
}

.imagen-container img {
    max-width: 500px;
}

.boton-container img {
    max-width: 500px;
}

/* Estilos del pie de página */


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

    


    .main-block h1 {
        margin-left: 6vh;
    }

    .horarios {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 5vh;
    }

    .horarios-img,
    .horarios-txt {
        flex: 1;
    }

    .horarios-img__image {
        width: 100%;
        max-width: 600px;
    }

    .horarios-txt {
        margin-top: 3vh;
    }

    .horarios-txt__title {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .horarios-txt__item {
        font-size: 22px;
    }

    .primera-img,
    .segunda-img {
        justify-content: center;
        margin-left: 0;
        margin-bottom: 5vh;
    }

    .primera-img__image,
    .segunda-img__image {
        width: 100%;
        max-width: 600px;
    }

    .button-bought {

        margin-right: 0;
        margin-bottom: 10vh;
    }

    .button-bought__link {
        font-size: 18px;
    }

    .frame-information,
    .frame-repart {
        max-width: 100%;
    }

}
</style>
