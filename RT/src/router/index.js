import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'
import Login from "@/views/Login/index.vue";
import Register from "@/views/Register/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router
