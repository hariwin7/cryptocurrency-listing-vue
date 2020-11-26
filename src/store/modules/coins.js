import axios from "axios";

const state = {
  coins: [],
  base: {},
  stats: {},
  loader: false,
};
const getters = {
  allCoins: (state) => state.coins,
  base: (state) => state.base,
  stats: (state) => state.stats,
  loader: (state) => state.loader,
};
const actions = {
  async getCoinData({ commit }, param) {
    commit("setLoader", true);
    const response = await axios.get(
      `https://api.coinranking.com/v1/public/coins/?limit=${param.limit}&offset=${param.offset}`
    );
    commit("setCoins", response.data.data.coins);
    commit("setBase", response.data.data.base);
    commit("setStats", response.data.data.stats);
    commit("setLoader", false);
  },
};
const mutations = {
  setCoins: (state, coins) => (state.coins = coins),
  setBase: (state, base) => (state.base = base),
  setStats: (state, stats) => (state.stats = stats),
  setLoader: (state, loader) => (state.loader = loader),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
