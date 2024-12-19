import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage/HomeView.vue'
import HomeView_News from '../views/HomePage/HomeView_News.vue'
import HomeView_Reports from '../views/HomePage/HomeView_Reports.vue'
import HomeView_Activities from '../views/HomePage/HomeView_Activities.vue'
import ProgramsSchedule from '../views/ProgramSchedule/ProgramsSchedule.vue'
import MarineSpecies from '../views/Marine/MarineSpecies.vue'
import SpeciesAnnotate from '../views/Marine/SpeciesAnnotate.vue'
import TicketInfoView from '../views/Ticket/TicketInfoView.vue'
import OrderTicketView from '../views/Ticket/OrderTicketView.vue'
import QandAView from '../views/FQA/Q&AView.vue'
import ProductView from '../views/Shop/ProductView.vue'



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
    {
      path: '/TicketInfoView',
      name: 'TicketInfoView',
      component: TicketInfoView
    },
    {
      path: '/OrderTicketView',
      name: 'OrderTicketView',
      component: OrderTicketView
    },
    {
      path: '/QandAView',
      name: 'QandAView',
      component: QandAView
    },
    {
      path: '/ProductView',
      name: 'ProductView',
      component: ProductView
    },

  ]
})

export default router
