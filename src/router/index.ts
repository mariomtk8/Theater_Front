import {createRouter,createWebHistory} from "vue-router";
import OTRAS from "../views/OtrasAct.vue"
import Index from "../views/Index.vue"
import Informacion from "../views/Informacion.vue"
import Contacto from "../views/Contacto.vue"
import Programacion from "../views/Programacion.vue"
import InfoFuncion from "../views/InfoFuncion.vue"
import HorariosCompra from "../views/HorariosCompra.vue"
import CompraEntradas from "../views/CompraEntradas.vue"
import Admin from "../views/Admin.vue"
import PanelAdmin from "../views/PanelAdmin.vue"
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
    path: '/HorariosCompra/:Id',
    name: 'HorariosCompra',
    component: HorariosCompra,
    
},
  {
    path: '/CompraEntradas/:Id',
    name: 'CompraEntradas',
    component: CompraEntradas,
    props: true
},
{
  path: '/Admin',
  name: 'Admin',
  component: Admin
},
{
  path: '/Admin/PanelAdmin',
  name: 'PanelAdmin',
  component: PanelAdmin
}

    ]
  });

  export default router
  