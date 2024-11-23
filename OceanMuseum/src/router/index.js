import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarineSpecies from '../views/MarineSpecies.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/MarineSpecies',
      name: 'MarineSpecies',
      component: MarineSpecies
    },
    
  ]
})

export default router
