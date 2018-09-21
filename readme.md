# Simple Vuex

### Simplify your store with smart default getters and mutations

[GitHub](https://github.com/sirberus/vuex-simple-store) • [NPM](https://www.npmjs.com/package/vuex-simple-store)

---

## Usage

```
npm i --save simple-vuex
```

### Provide state to get automatic getters and mutations:
```js
import SimpleVuex from 'SimpleVuex'

export default () => new SimpleVuex.Store({
  state: {
    name: 'Example'
  },
})
```

This is equivalent to the following with vanilla Vuex:

```js
import Vuex from 'Vuex'

export default () => new Vuex.Store({
  state: {
    name: 'Example'
  },
  getters: {
    name: state => {
      return state.name
    }
  },
  mutations: {
    'set-name': (state, val) => {
      state.name = val
    }
  }
})
```

> All mutations have the format `mutation-key` such as `set-name` above.

### Type-specific mutations based on default values:

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

### Works with modules and automatically makes them namespaced:
```js
export default () => new SimpleVuex.Store({
  state: {
    name: 'Example'
  },
  modules: {
    user: {
      loggedIn: false,
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
