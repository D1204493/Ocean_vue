import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLightbulb,faHome, faUser,faSearch,faTicketAlt,faLandmark, faShoppingCart, faImage  } from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/scripts/store.js";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
const app = createApp(App);
library.add(faLightbulb,faHome, faUser,faTicketAlt,faSearch,faLandmark , faShoppingCart, faImage);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(ToastPlugin);
app.mount('#app');
