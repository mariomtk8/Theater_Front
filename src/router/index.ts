import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '../store/Login';
import OTRAS from '../views/OtrasAct.vue';
import Index from '../views/Index.vue';
import Informacion from '../views/Informacion.vue';
import Contacto from '../views/Contacto.vue';
import Programacion from '../views/Programacion.vue';
import InfoFuncion from '../views/InfoFuncion.vue';
import HorariosCompra from '../views/HorariosCompra.vue';
import CompraEntradas from '../views/CompraEntradas.vue';
import Admin from '../views/Admin.vue';
import PanelAdmin from '../views/PanelAdmin.vue';
import Login from '../views/Login.vue';
import Tarjeta from '../views/Tarjeta.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/Login', name: 'Login', component: Login },
    { path: '/', name: 'index', component: Index },
    { path: '/OtrasActividades', name: 'OtrasActividades', component: OTRAS },
    { path: '/Informacion', name: 'Informacion', component: Informacion },
    { path: '/Contact', name: 'Contacto', component: Contacto },
    { path: '/Programacion', name: 'Programacion', component: Programacion },
    { path: '/InfoFuncion/:Id', name: 'InfoFuncion', component: InfoFuncion, props: true },
    { path: '/HorariosCompra/:Id', name: 'HorariosCompra', component: HorariosCompra },
    { path: '/CompraEntradas/:Id', name: 'CompraEntradas', component: CompraEntradas, props: true },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        const loginStore = useLoginStore();
        if (loginStore.admin) {
          next();
        } else {
          next('/Login');
        }
      }
    },
    { path: '/Admin/PanelAdmin', name: 'PanelAdmin', component: PanelAdmin },
    { path: '/Tarjeta/:Id', name: 'Tarjeta', component: Tarjeta }
  ]
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (to.matched.some(record => record.path.startsWith('/Admin')) && !loginStore.admin) {
    next({ path: '/Login' });
  } else {
    next(); 
  }
});

export default router;
