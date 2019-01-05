import Vuex from 'vuex'
import { applyDefaults } from './utils.js'

export default { 
  Store: (input) => () => new Vuex.Store(applyDefaults(input)),
  install: (Vue) => Vue.use(Vuex)
}
