export function delve(store, mutation) {
  let newStore = mutation(store)
  for (let [moduleName, module] of Object.entries(newStore.modules)) {
    newStore.modules[moduleName] =  delve(module, mutation)
  }
  return newStore
}

export function initialize(store) {
  return delve(store, s => Object.assign({
    modules: {},
    state: {},
    getters: {
      state: s => s
    },
    mutations: {},
    modules: {}
  }, s))
}

export function namespace(store) {
  return delve(store, s => {
    s.namespaced = true
    return s
  })
}

export function makeGetters(store) {
  return delve(store, s => {
    for (let key of Object.keys(s.state)) {
      s.getters[key] = state => state[key]
    }
    return s
  })
}

export function getType(val) {
  if (val === undefined) {
    return 'Undefined'
  } else if (val === null) {
    return 'Null' 
  } else {
    try {
      return val.constructor.name
    } catch(error) {
      return 'Unknown'
    }
  }
}

export function getMutations(key, val) {
  let mutations = {}
  mutations[`set-${key}`] = (state, val) => {state[key] = val}
  
  switch (getType(val)) {
    case 'Boolean':
      mutations[`toggle-${key}`] = (state) => {state[key] = !state[key]}
      break
    case 'Array':
      let singular = key.endsWith('s') ? key.substring(0, key.length-1) : key
      mutations[`remove-${singular}`] = (state, index) => {state[key].splice(index, 1)}
      mutations[`replace-${singular}`] = (state, index, newValue) => {state[key].splice(index, 1, newValue)}
      mutations[`push-${singular}`] = (state, val) => {state[key].push(val)}
      mutations[`pop-${singular}`] = (state) => {state[key].pop()}
      mutations[`shift-${singular}`] = (state, val) => {state[key].shift(val)}
      mutations[`unshift-${singular}`] = (state) => {state[key].unshift()}
      break
  }
  
  return mutations
}

export function makeMutations(store) {
  return delve(store, s => {
    for (let [key, val] of Object.entries(s.state)) {
      let mutations = getMutations(key, val)
      s.mutations = Object.assign(s.mutations, mutations)
    }
    return s
  })
}

export function applyDefaults(input) {
  let output = initialize(input)
  output = namespace(output)
  output = makeGetters(output)
  return makeMutations(output)
}

export default {
  initialize,
  namespace,
  makeGetters,
  makeMutations,
  applyDefaults,
}
