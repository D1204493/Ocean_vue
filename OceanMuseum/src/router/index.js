import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarineSpecies from '../views/Marine/MarineSpecies.vue'
import SpeciesAnnotate from '../views/Marine/SpeciesAnnotate.vue'
import TicketInfoView from '../views/Ticket/TicketInfoView.vue'
import OrderTicketView from '../views/Ticket/OrderTicketView.vue'
import QandAView from '../views/Q&AView.vue'


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
    
  ]
})

export default router
