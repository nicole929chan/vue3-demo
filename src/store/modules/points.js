import eventApi from "../../api/eventApi";

export default {
  namespaced: true,
  state: {
    title: 'Hello World',
    events: [],
    gifts: [],
    loading: false,
    error: '',
  },
  getters: {
    loadingStatus(state) {
      return state.loading;
    },
    errorMessage(state) {
      return state.error
    },
    eventList(state) {
      return state.events;
    }
  },
  actions: {
    getEvents(context) {
      context.commit('setDataFetchError', {
        loading: true,
        error: 'ABCDE'
      })

      setTimeout(() => {
        context.commit('setDataFetchError', {
          loading: false,
          error: 'RIVER'
        })
      }, 2000)
    }
  },
  mutations: {
    setDataFetchError(state, payload) {
      state.loading = payload.loading;
      state.error = payload.error
    },
    setEvents(state, events) {
      state.events = events
    },
  }
}