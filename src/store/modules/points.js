import pointApi from "../../api/pointApi";

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
    },
    giftList(state) {
      return state.gifts;
    }
  },
  actions: {
    getEventsAndGifts(context) {
      context.commit('setLoading', true, { root: true })
      context.commit('setMessage', '', { root: true })
      Promise.all([pointApi.getEvents(), pointApi.getGifts()])
        .then(res => {
          context.commit('setEvents', res[0])
          context.commit('setGifts', res[1])
        })
        .catch(err => {
          context.commit('setMessage', err, { root: true })
        })
        .finally(() => {
          context.commit('setLoading', false, { root: true })
        })
    },
    getEvents(context) {
      context.commit('setLoading', true, { root: true })
      context.commit('setMessage', '', { root: true })
      pointApi.getEvents()
        .then(res => {
          context.commit('setEvents', res)
        })
        .catch(err => {
          context.commit('setMessage', err, { root: true })
        })
        .finally(() => {
          context.commit('setLoading', false, { root: true })
        })
    },
    getGifts(context) {
      context.commit('setLoading', true, { root: true })
      context.commit('setMessage', '', { root: true })
      pointApi.getGifts()
        .then(res => {
          context.commit('setGifts', res)
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
    setGifts(state, gifts) {
      state.gifts = gifts
    },
  }
}