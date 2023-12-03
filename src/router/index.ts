import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/pages/TheHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome,
      meta: { hideFooter: true }, 

    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginPage,
      meta: { hideFooter: false }, 
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterPage,
      meta: { hideFooter: true }, 
    }
  ]
})

export default router
