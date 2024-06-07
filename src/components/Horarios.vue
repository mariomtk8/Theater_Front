<template>
  <div id="container" class="information-container">
    <h2 class="information-title">{{ $t('dateInfo.title') }}</h2>
    <div class="container-frame">
      <ul class="horarios-txt__list">
        <li v-for="sesion in store.sesiones" :key="sesion.idSesion" class="horarios-txt__item">
          {{ sesion.fecha }}
          <RouterLink
            v-if="store.funcion && store.funcion.id"
            :to="{
              path: '/CompraEntradas/' + store.funcion.id,
              query: { idSesion: sesion.idSesion }
            }"
            class="show-poster__button"
          >
            {{ $t('dateInfo.buy') }}
          </RouterLink>
          <span class="occupied-seats">
            {{ calculateOccupiedSeats(sesion.idSesion) }}/36
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchFuncion } from '../store/InfoFuncion';

const store = useFetchFuncion();
const route = useRoute();

onMounted(async () => {
  await nextTick();
  const idfuncion = route.params.Id as string;
  if (idfuncion) {
    await store.fetchFunciones(idfuncion);
  } else {
    console.error('ID de función no encontrado en la ruta.');
  }
});

const calculateOccupiedSeats = (idSesion: number) => {
  return store.asientosOcupados[idSesion]?.length || 0;
};
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


.main-block {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  background-color: #1E3367;
  height: 13vh;
  margin-bottom: 10vh;
}

.main-block h1 {
  color: white;
  font-size: xx-large;
  margin-left: 20vh;
}

.occupied-seats{
  margin-left: 4vh;
}

.information-title{
  margin: 5vh;
  font-size: 30px;
}

#container {
  text-align: center;
}

h2 {
  color: #333;
}

.container-frame {
  margin-top: 20px;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin-left: 10px;
}

.horario {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: auto;
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
      margin: 26px;
  }

.fecha,
.hora,
.disponibilidad {
  flex: 1;
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

  main {
    margin: 0 15px;
  }

  .frame-function {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 500px;
  }


  .main-block h1 {
    margin-left: 6vh;
  }
}
</style>