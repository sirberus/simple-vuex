import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from 'simple-vuex'

export default store()
  .addKey('dark', false)
  .addModule('example', store()
    .addKey('a', 'b')
  )
  .simplify()
