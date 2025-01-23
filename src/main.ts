import './assets/styles.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import Button from './components/Button.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('CustomButton', Button)
app.mount('#app')
