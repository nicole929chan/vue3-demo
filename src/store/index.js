import { createStore } from "vuex";
import points from "./modules/points";

const store = createStore({
  modules: {
    points,
  }
})

export default store;

