import axios from "axios";

const state = {
  coins: [],
};
const getters = {
  allCoins: (state) => state.coins,
};
const actions = {
  async getCoinData({ commit }) {
    const response = await axios.get(
      "https://api.coinranking.com/v1/public/coins/?limit=100"
    );
    commit("setCoins", response.data.data.coins);
  },
};
const mutations = {
  setCoins: (state, coins) => (state.coins = coins),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
