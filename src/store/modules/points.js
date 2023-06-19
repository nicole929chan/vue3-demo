import pointApi from "../../api/pointApi";
import userApi from "../../api/userApi";

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
    },
    getEventById(state) {
      return (id) => {
        return state.events.find(event => event.id === id)
      }
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
      const user_id = context.rootState.user.id
      pointApi.getGifts({ user_id })
        .then(res => {
          context.commit('setGifts', res)
        })
        .catch(err => {
          context.commit('setMessage', err, { root: true })
        })
        .finally(() => {
          context.commit('setLoading', false, { root: true })
        })
    },
    getUser(context, user_id) {
      userApi.getUser(user_id)
        .then(res => {
          if (res === undefined) {
            context.commit('setMessage', 'You\'re not a member.', { root: true })
          }
          context.commit('setUser', res)
        })
        .catch(err => {
          console.log(err)
          context.commit('setMessage', err, { root: true })
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
    setUser(state, user) {
      state.user = user
    }
  }
}