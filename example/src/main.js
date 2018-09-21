import Vue from 'vue'
import SimpleVuex from './../../src/index.js'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(SimpleVuex)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
