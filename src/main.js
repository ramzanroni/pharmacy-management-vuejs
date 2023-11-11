import { createApp } from 'vue'
import "./assets/css/ayoflex.css";
import "./assets/css/example.css";
import App from './App.vue'
import mitt from 'mitt'

let eventBus = mitt();

const app=createApp(App);
app.config.globalProperties.$eventBus=eventBus;

app.mount('#app');
