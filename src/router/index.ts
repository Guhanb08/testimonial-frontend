import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import TheHome from '@/pages/TheHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import DashboardPage from '@/pages/TheDashboard.vue'
import SpacePage from '@/pages/TheSpace.vue'
import TheProduct from '@/pages/TheProduct.vue'
import TheReview from '@/pages/TheReview.vue'
import TheError from '@/pages/TheError.vue'


const redirectToDashboardIfLoggedIn = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (localStorage.getItem('accessToken')) {
    next('/dashboard');
  } else {
    next();
  }
};


const router = createRouter({
    history: createWebHistory('/testimonials'),
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
      beforeEnter: redirectToDashboardIfLoggedIn,
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterPage,
      beforeEnter: redirectToDashboardIfLoggedIn,
    }
    ,
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
    }
    ,

   

    {
      path: '/space',
      name: 'space',
      component: SpacePage,
    },
    {
      path: '/products/:slug',
      name: 'products',
      component: TheProduct,
    }
    ,
    {
      path: '/review/:slug',
      name: 'review',
      component: TheReview,
    }
    ,

    {
      path: '/error',
      name: 'error',
      component: TheError,
    }
  ]
})

export default router
