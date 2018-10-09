# Simple Vuex

### Simplify your store with smart default getters and mutations

---

## Install

```
npm i --save simple-vuex
```

## It's just a simple Vuex wrapper, except...

```js
import SimpleVuex from 'SimpleVuex'

export default SimpleVuex.Store({
  state: {
    name: 'Evan You',
    loggedIn: false
  },
  getters: {
    name: state => state.name,
    firstName(state) => state.name.split(' ')[0],
    loggedIn: state => state.loggedIn,
  },
  mutations: {
    setName(state, val) {
      state.name = val
    },
    setLoggedIn(state, val) {
      state.loggedIn = val
    },
    logIn(state) {
      state.loggedIn = true
    }
  }
})
```

## You get automatic getters and mutations based on default state, so that example can be reduced to just the unique getters and setters:
```js
import SimpleVuex from 'SimpleVuex'

export default SimpleVuex.Store({
  state: {
    name: 'Evan',
    loggedIn: false
  },
  getters: {
    firstName(state) => state.name.split(' ')[0],
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true
    }
  }
})
```

## Base getters and setters

```js
import SimpleVuex from 'SimpleVuex'

export default SimpleVuex.Store({
  state: {
    label: 'Example'
  },
})
```

This is equivalent to the following with vanilla Vuex:

```js
import Vuex from 'Vuex'

export default new Vuex.Store({
  state: {
    label: 'Example'
  },
  getters: {
    label: state => state.label,
  },
  mutations: {
    'set-label': (state, val) => {
      state.label = val
    },
  }
})
```

> **All automatic mutations have the format `${mutation}-${key}` such as `set-label` above.**

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
    name: 'Evan You'
  },
  getters: {
    firstName(state) {
      return state.name.split(' ')[0]
    }
  },
  modules: {
    user: {
      state: {
        loggedIn: false,
      },
      mutation: {
        logIn(state) {
          state.loggedIn = true
        },
        logOut(state) {
          state.loggedIn = false
        }
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
