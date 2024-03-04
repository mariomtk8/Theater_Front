import './assets/img/base.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Crear una nueva instancia de la aplicación Vue
const app = createApp(App);

// Usar el router y Pinia con la aplicación Vue
app.use(router);
app.use(createPinia());

// Montar la aplicación Vue en el contenedor del DOM
app.mount('#app');