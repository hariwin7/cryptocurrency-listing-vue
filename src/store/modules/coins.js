import axios from "axios";

const state = {
  coins: [],
  base: {},
};
const getters = {
  allCoins: (state) => state.coins,
  base: (state) => state.base,
};
const actions = {
  async getCoinData({ commit }, param) {
    const response = await axios.get(
      `https://api.coinranking.com/v1/public/coins/?limit=${param.limit}&offset=${param.offset}`
    );
    commit("setCoins", response.data.data.coins);
    commit("setBase", response.data.data.base);
  },
};
const mutations = {
  setCoins: (state, coins) => (state.coins = coins),
  setBase: (state, base) => (state.base = base),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
