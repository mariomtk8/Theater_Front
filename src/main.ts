import './assets/img/base.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './vue-i18n';
import { createPinia } from 'pinia';


const app = createApp(App);


app.use(router);
app.use(i18n)
app.use(createPinia());

app.mount('#app');