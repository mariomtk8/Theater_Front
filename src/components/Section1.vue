<template>
<section class="performance-block">
            <div class="performance-block__info">
                <h2 class="performance-block__title">Próxima Función</h2>
                <a href="#" class="performance-block__button">Comprar Entradas</a>
            </div>
            <div class="performance-block__image">
                <img src="../assets/img/fotos-descripción-obras-teatro/romo-julieta/ROMEO-Y-JULIETA.jpeg" alt="Función de Teatro" class="image__img">
            </div>
            <div class="performance-block__name">
                <h2 class="performance-block__name-title">Romeo y Julieta</h2>
                <a class="performance-block__name-text">"Romeo y Julieta" es una obra de teatro escrita por William Shakespeare en el siglo XVI. La trama sigue a dos jóvenes amantes, Romeo y Julieta, cuyas familias rivales generan conflictos. A pesar de las adversidades, se enamoran y casan en secreto, pero una serie de malentendidos y tragedias lleva a un desenlace fatal. La obra explora temas como el amor, la rivalidad familiar y el destino, convirtiéndose en una de las historias de amor más conocidas de la literatura.</a>
            </div>
        </section>
</template>

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
}
</style>