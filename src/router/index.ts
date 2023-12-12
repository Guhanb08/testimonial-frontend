import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '@/pages/TheHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import DashboardPage from '@/pages/TheDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHome,
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterPage,
    }
    ,
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
    }

  ]
})

export default router
