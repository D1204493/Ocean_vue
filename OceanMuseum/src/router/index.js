import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarineSpecies from '../views/MarineSpecies.vue'
import SpeciesAnnotate from '../views/SpeciesAnnotate.vue'


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
    {
      path: '/species/:id',
      name: 'SpeciesAnnotate',
      component: SpeciesAnnotate,
      props: true  // 允許將路由參數作為props傳遞
    },
    
  ]
})

export default router
