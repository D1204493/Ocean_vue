import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView_News from '../views/HomeView_News.vue'
import HomeView_Reports from '../views/HomeView_Reports.vue'
import HomeView_Activities from '../views/HomeView_Activities.vue'
import ProgramsSchedule from '../views/ProgramsSchedule.vue'
import MarineSpecies from '../views/MarineSpecies.vue'
import SpeciesAnnotate from '../views/SpeciesAnnotate.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home-news',
          redirect: '/news'
        }
      ]
    },
    { 
      path: '/news', 
      name: 'news',
      component: HomeView_News 
    },
    { 
      path: '/reports', 
      name: 'reports',
      component: HomeView_Reports 
    },
    { 
      path: '/activities', 
      name: 'activities',
      component: HomeView_Activities 
    },
    {
      path: '/programs',
      name: 'programs',
      component: ProgramsSchedule
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
