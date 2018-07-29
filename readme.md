# Vuex Simple Store

Spend as little time as possible with the store.

#### Before:
```js
import Vuex from 'vuex'
import someModule from './someModule.js'

export default () => new Vuex.Store({
  namespaced: true,
  modules: {
    myModuleName: someModule
  },
  state: {
    name: 'DEFAULT'
  },
  getters: {
    name(state) {
      return state.name || 'DEFAULT' 
    }
  },
  mutations: {
    setName(state, val) {
      state.name = val
    }
  },
})
```

#### After:
```js
import someModule from './someModule.js'
import store from 'vue-simple-store'

export default store()
  .addModule('myModuleName', someModule)
  .addKey('name', 'DEFAULT')
  .simplify() // Add to your store's root only to wrap in () => Vuex.Store(__)
```

> **Note:** The setter is 'set-name', not 'setName'. There is no auto-camelcasing.

## Inline Modules

```js
import store from 'vue-simple-store'

export store()
  .addKey('name', 'DEFAULT')
  .addModule('myModuleName', store()
    .addKey('key', 'default') // note: don't call .simplify() on modules, only root store
  )
  .simplify()
```

## Custom Mutations and Actions

```js
import store from 'vue-simple-store'

let s = store()
  .addKey('name', 'DEFAULT')
  .addModule('myModuleName', store()
    .addKey('key', false)
  )

s.mutations.toggleKey = (state) => {
  state.myModuleName.key = ! state.myModuleName.key
}

export s.simplify()
```

## Trivialize your store into a single file

```js
import store from 'vue-simple-store'

let s = store()
  .addKey('darkMode', false)

s.mutation.toggleDarkmode = (state) => {state.darkMode = !state.darkMode}

s.addModule('auth', store()
  .addKey('user', {})
)

s.addModule('locations', store()
  .addKey('countries', [])
  .addKey('cities', [])
  .addKey('campuses', [])
  .addKey('buildings', [])
  .addKey('floors', [])
  .addKey('rooms', [])
)

s.addModule('data', store()
  .addKey('raw', [])
  .addKey('processed', [])
)

export s.simplify()
```

#### $store API for the above:

* getters:

  * getters['darkMode']
  * getters['auth/user']
  * getters['locations/countries']
  * getters['locations/cities']
  * getters['locations/campuses']
  * getters['locations/buildings']
  * getters['locations/floors']
  * getters['locations/rooms']
  * getters['data/raw']
  * getters['data/processed']
  
* setters:
  
  * commit('toggleDarkMode')
  * commit('darkMode', val)
  * commit('auth/set-user', val)
  * commit('locations/set-countries', val)
  * commit('locations/set-cities', val)
  * commit('locations/set-campuses', val)
  * commit('locations/set-buildings', val)
  * commit('locations/set-floors', val)
  * commit('locations/set-rooms', val)
  * commit('data/set-raw', val)
  * commit('data/set-processed', val)

## Dev Setup

* Clone from GitHub repo (https://github.com/sirberus/vue-simple-store)

* In /example/, open a terminal, npm install, and npm run serve
