import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      hasSigned: false,
      zipCode: null
    },

    mutations: {
      setHasSigned(state, value) {
        state.hasSigned = value
      },

      setZipCode(state, value) {
        state.zipCode = value
      }
    }
  })
}

export default createStore
