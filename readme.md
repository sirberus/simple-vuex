# Simple Vuex

#### Install

```
npm i --save simple-vuex
```

## Automatic getters and mutations based on default state

This input:

```js
import SimpleVuex from 'SimpleVuex'

export default SimpleVuex.Store({
  state: {
    name: 'Evan You',
    loggedIn: false,
    favorites: [],
  },
  getters: {
    firstName(state) => state.name.split(' ')[0],
  },
})
```

Is equivalent to this:

```js
import Vuex from 'Vuex'

export default Vuex.Store({
  state: {
    name: 'Evan You',
    loggedIn: false,
    favorites: [],
  },
  getters: {
    name: state => state.name,
    firstName(state) => state.name.split(' ')[0],
    loggedIn: state => state.loggedIn,
    title: state => state.title,
    state: state => state,
  },
  mutations: {
    'set-name': (state, val) => {
      state.name = val
    },
    'set-loggedIn': (state, val) =>  {
      state.loggedIn = val
    },
    'toggle-loggedIn': (state) => {
      state.loggedIn = ! state.loggedIn
    },
    'pop-favorite': (state) => {
      state.favorites.pop()
    },
    // ... and several other mutations!
  }
})
```

> **All automatic mutations have the format `${mutation}-${key}` such as `set-name` above.**

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
    state: state => state,
    label: state => state.label,
  },
  mutations: {
    'set-label': (state, val) => {
      state.label = val
    },
  }
})
```

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

#### Array

```js
state: {
  favorites: []
}
```

Yields these additional mutations:

```js
"remove-favorite": (state, index) => {
  state.favorites.splice(index, 1)
}
"replace-favorite": (state, index, newValue) => {
  state.favorites.splice(index, 1, newValue)
}
"push-favorite": (state, val) => {
  state.favorites.push(val)
}
"pop-favorite": (state) => {
  state.favorites.pop()
}
"shift-favorite": (state, val) => {
  state.favorites.shift(val)
}
"unshift-favorite": (state) => {
  state.favorites.unshift()
}
```

> **Note the singular 'favorite'.** If the key ends with an 's' (like 'favorites' does) then the s will be removed for mutations that don't 

> *More type-specific getters and mutations are planned for future releases*

## Works with modules and automatically makes them namespaced:
```js
export default SimpleVuex.Store({
  state: {
    name: 'You'
  },
  modules: {
    profile: {
      state: {
        lastLogin: null,
      },
    }
  },
})
```

This yields getters `name` and `profile/lastLogin`, and mutations `set-name` and `profile/set-lastLogin`.

## Dev Setup

* Clone from GitHub repo (https://github.com/sirberus/simple-vuex)

* In /example/, open a terminal, npm install, and npm run serve

## ToDo

* More type-specific mutations

* Type-specific getters

* Clever helper functions

  * `$store.get(strpath)` eg `$store.get('user/profile.info')`
