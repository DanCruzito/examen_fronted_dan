import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/autores',
    name: 'autores_lista',
    component: () => import(/* webpackChunkName: "about" */'../views/autor/autor_lista.vue')
  },
  {
    path: '/libros',
    name: 'libros_lista',
    component: () => import(/* webpackChunkName: "about" */'../views/libro/libro_lista.vue')
  },
  {
    path: '/clientes',
    name: 'clientes_lista',
    component: () => import(/* webpackChunkName: "about" */'../views/cliente/cliente_lista.vue')
  },
  {
    path: '/libros_vencidos',
    name: 'libros_vencidos_lista',
    component: () => import(/* webpackChunkName: "about" */'../views/reporte/libros_vencidos.vue')
  },
  {
    path: '/autores/:id',
    name: 'autor_detalle',
    component: () => import(/**/'../views/autor/autor_detalle.vue')
  },
  {
    path: '/libros/:id',
    name: 'libro_detalle',
    component: () => import(/**/'../views/libro/libro_detalle.vue')
  },
  {
    path: '/autores/:id/edit',
    name: 'autor_edit',
    component: () => import(/**/'../views/autor/autor_edit.vue')
  },
  {
    path: '/libros/:id/edit',
    name: 'libro_edit',
    component: () => import(/**/'../views/libro/libro_edit.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
