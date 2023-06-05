import eventApi from "../../api/eventApi";

export default {
  namespaced: true,
  state: {
    title: 'Hello World',
    events: [],
    gifts: [],
  },
  getters: {
    eventList(state) {
      return state.events;
    }
  },
  actions: {
    getEvents(context) {
      context.commit('setLoading', true, { root: true })
      context.commit('setMessage', '', { root: true })
      eventApi.getEvents()
        .then(res => {
          context.commit('setEvents', res)
        })
        .catch(err => {
          context.commit('setMessage', err, { root: true })
        })
        .finally(() => {
          context.commit('setLoading', false, { root: true })
        })
    }
  },
  mutations: {
    setEvents(state, events) {
      state.events = events
    },
  }
}