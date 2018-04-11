import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      hasSigned: false
    },

    mutations: {
      setHasSigned(state, value) {
        state.hasSigned = value
      }
    }
  })
}

export default createStore