import {createRouter,createWebHistory} from "vue-router";
import OTRAS from "../views/OtrasAct.vue"
import Index from "../views/Index.vue"
import Informacion from "../views/Informacion.vue"
import Contacto from "../views/Contacto.vue"
import Programacion from "../views/Programacion.vue"
import InfoFuncion from "../views/InfoFuncion.vue"
import Compra from "../views/Compra.vue"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/OtrasActividades',
        name: 'OtrasActividades',
        component: OTRAS
      },
      {
        path: '/Informacion',
        name: 'Informacion',
        component: Informacion
      },
      {
        path: '/Contact',
        name: 'Contacto',
        component: Contacto
      },
      {
        path: '/Programacion',
        name: 'Programacion',
        component: Programacion
    },
    {
      path: '/InfoFuncion/:Id',
      name: 'InfoFuncion',
      component: InfoFuncion,
      props: true
  },
  {
    path: '/Compra/:Id',
    name: 'Compra',
    component: Compra,
    props: true
}
    ]
  });

  export default router
  