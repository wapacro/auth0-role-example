import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App)

app.use(router)
app.use(createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    cacheLocation: 'localstorage',
    authorizationParams: {
        redirect_uri: window.location.origin
    }
}))

app.mount('#app')
