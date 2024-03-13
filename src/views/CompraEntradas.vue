<template>
  <main>
    <article class="article-block">
      <div class="main-block">
        <h1>Compra de entradas</h1>
      </div>
      <FrameMain></FrameMain>
    </article>
    <Butacas></Butacas>
  </main>
</template>

<script setup lang="ts">
import FrameMain from '@/components/Frame-Main.vue';
import Butacas from '@/components/Butacas.vue';
</script>
    

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.main-block {
  background-color: #1E3367;
  color: white;
  text-align: center;
  padding: 20px 0;
}

.main-block h1 {
  font-size: 32px;
  margin: 0;
}

.article-block {
  text-align: center;
}

</style>