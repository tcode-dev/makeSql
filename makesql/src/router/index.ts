import { createRouter, createWebHistory } from 'vue-router'
import TextView from '../views/TextView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TextView
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('../views/ConfigView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
