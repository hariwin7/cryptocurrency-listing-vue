import Vuex from "vuex";

import Vue from "vue";

import coins from "./modules/coins";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coins,
  },
});
