// import store from 'simple-vuex'
import SimpleVuex from './../../src/index.js'

export default SimpleVuex.Store({
  state: {
    dark: false,
    favorites: [],
    data: {},
    score: 1,
    name: "example",
    empty: null,
    undefined: undefined,
  },
  modules: {
    example: {
      state: {
        a: "b"
      }
    }
  }
})
