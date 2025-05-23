import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css'




const app = createApp(App)

app.use(router)

app.mount('#app')
