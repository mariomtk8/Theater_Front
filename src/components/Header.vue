<script setup lang="ts">
  import {RouterLink} from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/Index">
        <div class="logo">
            <div class="circulo-externo">
                <div class="circulo-interno">
                    <div class="estrella" id="estrella1"></div>
                    <div class="estrella" id="estrella2"></div>
                    <div class="estrella" id="estrella3"></div>
                    <div class="Caretas">
                    <img src="../assets/img/Careta-amarilla.png" class="cara" id="cara-feliz">
                    <img src="../assets/img/Careta-Morada.png" class="cara" id="cara-triste">
                    </div>
                </div>
            </div>
        </div>
      </RouterLink>
    </div>
    <nav class="header__nav">
      <RouterLink to="/Programacion" class="nav__link">Programación</RouterLink>
      <RouterLink to="/Informacion" class="nav__link">Información</RouterLink>
      <RouterLink to="/OtrasActividades" class="nav__link">Otras Actividades</RouterLink>
      <RouterLink to="/Contact" class="nav__link">Contacto</RouterLink>
    </nav>
  </header>
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
    text-decoration: none;
}

body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
}

.header {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    color: #000000;
    height: 23vh;
    max-width: 1000px;
    margin: auto;
}

.header__logo {
    flex: 1;
    text-align: center;
}

.logo__image {
    max-width: 140px;
    height: auto;
}
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.circulo-externo {
    width: 100px; 
    height: 100px;
    border-radius: 50%;
    background-color: navy; 
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotar 10s linear infinite;
}

.circulo-interno {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #1E3367; 
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cara {
    position: absolute;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    transition: transform 0.5s ease;
}
.Caretas{
  display: flex;
  justify-content: center;
}
#cara-feliz {
    left: 50%;
    transform: translate(-50%, -40%);
    width: 180px; 
}

#cara-triste {
    left: 50%;
    width: 180px; 
    transform: translate(-50%, -40%); 
}


.estrella {
    position: absolute;
    width: 10px; 
    height: 10px;
    background-color: yellow; 
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
   
}

#estrella1 {
    top: 10%;
    left: 50%;
    transform: translate(-50%, -80%);
}

#estrella2 {
    top: 90%;
    left: 20%;
    transform: translate(-50%, -80%);
}

#estrella3 {
    top: 80%;
    right: 20%;
    transform: translate(50%, -80%);
}

@keyframes rotar {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

.circulo-externo:hover .cara {
    transform: scale(1.1);
}

  .header__nav {
    flex: 2.2;
    display: flex;
    text-align: left;
    justify-content: left;
    gap: 20px;
}

.nav__link {
    color: #000000;
    text-decoration: none;
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
}
</style>