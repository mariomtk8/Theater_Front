<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/Index">
        <div class="logo">
          <canvas id="logoCanvas" width="200" height="200"></canvas>
          <img src="../assets/img/Careta-amarilla.png" class="mask mask-yellow" />
          <img src="../assets/img/Careta-Morada.png" class="mask mask-purple" />
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const outerRadius = ref(0); 
const innerRadius = ref(0); 
const starRotation = ref(0); 

onMounted(() => {
  const canvas = document.getElementById('logoCanvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const drawCircles = () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'navy';
    ctx.beginPath();
    ctx.arc(100, 100, outerRadius.value, 0, Math.PI * 2);
    ctx.fill();

  
    ctx.fillStyle = '#1E3367';
    ctx.beginPath();
    ctx.arc(100, 100, innerRadius.value, 0, Math.PI * 2);
    ctx.fill();
  };

  const animateCircles = () => {
    
    outerRadius.value += (50 - outerRadius.value) * 0.05;
    innerRadius.value += (40 - innerRadius.value) * 0.05;

    drawCircles(); 
    requestAnimationFrame(animateCircles); 
  };

  const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, rotation: number) => {
    const rot = Math.PI / 2 * 3;
    let x, y, step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot + rotation) * outerRadius;
      y = cy + Math.sin(rot + rotation) * outerRadius;
      ctx.lineTo(x, y);
      rotation += step;

      x = cx + Math.cos(rot + rotation) * innerRadius;
      y = cy + Math.sin(rot + rotation) * innerRadius;
      ctx.lineTo(x, y);
      rotation += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
  };

  const animateStars = () => {
    starRotation.value += 0.01;
    drawStar(105, 70, 5, 7, 3, starRotation.value);
    drawStar(70, 115, 5, 7, 3, starRotation.value);
    drawStar(140, 115, 5, 7, 3, starRotation.value);
    requestAnimationFrame(animateStars);
  };

  animateCircles();
  animateStars();
});
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
  position: relative;
  width: 200px; 
  height: 200px; 
}

.mask {
  position: absolute;
  width: 190px;
    height: 190px;
    top: 58%;
  left: 50%; 
  transform: translate(-50%, -50%); 
}

.mask-yellow {
  margin-top: 15px; 
}

.mask-purple {
  margin-top: -10px; 
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