<script setup lang="ts">
import { useRoute } from 'vue-router'; 
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';

const route = useRoute(); 
</script>

<template>
  
  <Header v-if="route.name !== 'Login'"></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer v-if="route.name !== 'Login'"></Footer>
</template>