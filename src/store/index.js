import { createStore } from "vuex";
import points from "./modules/points";

const store = createStore({
  modules: {
    points,
  },
  state: {
    loading: false,
    message: '',
    user: {
      id: 3,
      name: 'Michael'
    }
  },
  getters: {
    // 
  },
  actions: {
    getUser(context) {
      // 
    }
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

