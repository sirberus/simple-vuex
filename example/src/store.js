import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from '../../src/index.js'

export default store()
  .addKey('dark', false)
  .addModule('example', store()
    .addKey('a', 'b')
  )
  .simplify()
