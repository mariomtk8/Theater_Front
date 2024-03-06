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
    color: #ffffff; /* Establece un color de texto predeterminado para una mejor coherencia */
}

body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    overflow-x: hidden; /* Evita el desbordamiento horizontal */
}

.performance-block {
    background-color: #1E3367;
    display: flex;
    flex-wrap: wrap; /* Asegura que el contenido sea responsivo */
    justify-content: center;
    align-items: flex-start;
    gap: 20px; /* Espacio entre elementos */
    padding: 20px;
    min-height: 60vh;
}

.performance-block__info,
.performance-block__image,
.performance-block__name {
    flex: 1 1 300px; /* Hace que los bloques sean flexibles pero no menores de 300px */
    padding: 10px;
}

.performance-block__title,
.performance-block__name-title {
    margin-bottom: 20px;
    font-size: 2rem; /* Un tamaño de fuente más adaptable */
}

.performance-block__button {
    display: inline-block;
    padding: 15px 30px;
    background-color: #F2A365; /* Color más vibrante para el botón */
    color: #000;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.2rem;
    transition: background-color 0.3s; /* Añade una transición para interacciones del usuario */
}

.performance-block__button:hover,
.performance-block__button:focus {
    background-color: #D9894F; /* Cambio de color al pasar el mouse para mayor interactividad */
    color: #fff;
}

.performance-block__image img {
    max-width: 100%; /* Hace que la imagen sea responsiva */
    height: auto; /* Mantiene la proporción de la imagen */
}

.performance-block__name-text {
    display: block; /* Asegura que se muestre como bloque */
    text-align: justify; /* Mejora la legibilidad del texto */
    padding: 10px; /* Añade algo de espacio alrededor del texto */
}

/* Media queries para una mejor responsividad en dispositivos pequeños */
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
        text-align: center; /* Centra el texto para dispositivos más pequeños */
    }
}
</style>