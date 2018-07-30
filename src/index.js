import Vuex from 'vuex'

export default function store() {
  return Object.assign({}, {
    namespaced: true,
    modules: {},
    state: {},
    getters: {},
    mutations: {},
    addModule(name, module) {
      this.modules[name] = module
      return this
    },
    addKey(name, defaultValue) {
      this.state[name] = defaultValue
      this.getters[name] = (state) => (state[name] || defaultValue)
      this.mutations['set-'+name] = (state, val) => (state[name] = val)
      return this
    },
    simplify() {
      return () => new Vuex.Store(this)
    }
  })
}
