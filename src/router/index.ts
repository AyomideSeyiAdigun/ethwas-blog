import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { AUTH_TOKEN } from '@/constants/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
     {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
     {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/SignUp.vue'),
    },
     {
      path: '/draft',
      name: 'draft',
      component: () => import('../views/DraftView.vue'),
       meta: {
        requiresAuth: true
      }

    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue'),
    // },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
