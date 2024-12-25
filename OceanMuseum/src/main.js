// import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLightbulb,faHome, faUser,faSearch,faTicketAlt,faLandmark, faShoppingCart  } from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
library.add(faLightbulb,faHome, faUser,faTicketAlt,faSearch,faLandmark , faShoppingCart);
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
