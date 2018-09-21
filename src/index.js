import Vuex from 'vuex'
import utils from './utils.js'

export default { 
  Store(input) {
    let output = utils.initialize(input)
    output = utils.namespace(output)
    output = utils.makeGetters(output)
    output = utils.makeMutations(output)
    console.log(output)
    return () => new Vuex.Store(output)
  },
  install(Vue) {
    Vue.use(Vuex)
  }
}
