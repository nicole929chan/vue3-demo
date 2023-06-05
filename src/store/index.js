import { createStore } from "vuex";
import points from "./modules/points";

const store = createStore({
  modules: {
    points,
  },
  state: {
    loading: false,
    message: '',
  },
  getters: {
    // 
  },
  actions: {
    // 
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setMessage(state, value) {
      state.message = value;
    }
  }
})

export default store;

