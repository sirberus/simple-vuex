# Simple Vuex

### Simplify your store with smart default getters and mutations

---

## Install

```
npm i --save simple-vuex
```

## Provide state to get automatic getters and mutations:
```js
import SimpleVuex from 'SimpleVuex'

export default SimpleVuex.Store({
  state: {
    name: 'Example',
    loggedIn: false
  },
})
```

This is equivalent to the following with vanilla Vuex:

```js
import Vuex from 'Vuex'

export default new Vuex.Store({
  state: {
    name: 'Example'
  },
  getters: {
    name: state => {
      return state.name
    },
    loggedIn: state => {
      return state.loggedIn
    }
  },
  mutations: {
    'set-name': (state, val) => {
      state.name = val
    },
    'set-loggedIn': (state, val) => {
      state.loggedIn = val
    },
    'toggle-loggedIn': (state, val) => {
      state.loggedIn = ! state.loggedIn
    },
  }
})
```

> **All mutations have the format `mutation-key` such as `set-name` above.**

## Type-specific mutations based on default values:

#### Boolean

```js
state: {
  enabled: false
}
```

Yields this additional mutation:

```js
"toggle-enabled": (state) => {
  state.enabled = !state.enabled
}
```

> *More type-specific getters and mutations are planned for future releases*

## Works with modules and automatically makes them namespaced:
```js
export default SimpleVuex.Store({
  state: {
    name: 'Example'
  },
  modules: {
    user: {
      state: {
        loggedIn: false,
      }
    }
  },
})
```

Yields this additional mutation:

```js
"user/toggle-loggedIn": (state) => {
  state.user.loggedIn = !state.user.loggedIn
}
```

## Dev Setup

* Clone from GitHub repo (https://github.com/sirberus/simple-vuex)

* In /example/, open a terminal, npm install, and npm run serve

## ToDo

* More type-specific mutations

* Type-specific getters

* Clever helper functions

  * `$store.get(strpath)` eg `$store.get('user/profile.info')`
