<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/">
        <div class="logo">
          <canvas id="logoCanvas" width="200" height="200"></canvas>
          <img src="../assets/img/Careta-amarilla.png" class="mask mask-yellow" />
          <img src="../assets/img/Careta-Morada.png" class="mask mask-purple" />
        </div>
      </RouterLink>
    </div>
    <nav class="header__nav">
      <RouterLink to="/Programacion" class="nav__link">{{ $t('navigation.program') }}</RouterLink>
      <RouterLink to="/Informacion" class="nav__link">{{ $t('navigation.information') }}</RouterLink>
      <RouterLink to="/OtrasActividades" class="nav__link">{{ $t('navigation.otherActivities') }}</RouterLink>
      <RouterLink to="/Contact" class="nav__link">{{ $t('navigation.contact') }}</RouterLink>
      <RouterLink to="/Login" class="nav__link">{{ $t('navigation.login') }}</RouterLink>
      
      <form class="search-form" @submit.prevent="store.fetchResults">
        <input type="text" :placeholder="$t('navigation.searchPlaceholder')" class="search-input" v-model="store.searchQuery" @input="store.fetchResults"/>
        <button type="submit" class="search-button">{{ $t('navigation.searchButton') }}</button>
      </form>
      <div class="search-results" v-if="store.results.length > 0">
        <ul>
          <li v-for="result in store.results" :key="result.id">
            <RouterLink :to="{ path: '/InfoFuncion/' + result.id }">
              {{ result.nombre }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <p v-if="store.searchError">{{ $t('navigation.searchError') }}</p>
    </nav>
    <div class="language-switcher">
      <button class="Español" @click="changeLanguage('es')">Español</button>
      <button class="Ingles" @click="changeLanguage('en')">English</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useProgramacion } from '../store/Programacion';
import { useI18n } from 'vue-i18n'; // Importa useI18n correctamente

const store = useProgramacion();
const { searchQuery, results, noResults, searchError, fetchResults } = useProgramacion();
const { locale } = useI18n(); // Usa useI18n correctamente

const outerRadius = ref(0); 
const innerRadius = ref(0); 
const starRotation = ref(0);

const changeLanguage = (lang: string) => {
  locale.value = lang;
};

onMounted(() => {
  store.fetchFunciones();
  
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
.search-form {
    position: relative; /* Posición relativa para el despliegue absoluto de resultados */
    display: flex;
    align-items: center;
    width: 50%;
}

.search-input {
    width: 50%; /* Aprovecha todo el espacio disponible */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.search-button {
    padding: 10px 15px;
    background-color: #1E3367;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.search-button:hover {
    background-color: #1E3367;
}

.search-results {
    position: absolute;
    width: 30%;
    margin-top: 7vh;
    margin-left: 50vh;
    background: white;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 10;
}

.search-results ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.search-results li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.search-results li:hover {
    background-color: #f7f7f7;
}

.noResults, .searchError {
    color: #cc0000;
    padding: 10px;
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
.language-switcher {
    display: flex;
    flex-direction: column;
    gap: 10px;
    }
    .Español{
      padding: 10px 15px;
    background-color: #1E3367;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
   }
    .Ingles{
      padding: 10px 15px;
    background-color: #1E3367;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
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
    flex: 2.;
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
    .language-switcher {
    display: flex;
    flex-direction: column;
    gap: 10px;
    }
    .Español{
      padding: 10px 15px;
    background-color: #1E3367;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
   }
    .Ingles{
      padding: 10px 15px;
    background-color: #1E3367;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
    }
  
    .header__nav {
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 10px;
    }
    .search-form {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .search-input, .search-button {
    width: 90%; /* Adjust based on your layout needs */
    margin: 5px 0; /* Spacing for mobile view */
  }
}
</style>