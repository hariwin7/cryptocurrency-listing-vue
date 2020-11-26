<template>
  <div class="coins">
    <h2>Cryptocurrency Prices</h2>
    <div class="paginate">
      <select v-model="page">
        <option value="10">10 rows</option>
        <option value="25">25 rows</option>
        <option value="50">50 rows</option>
        <option value="100">100 rows</option>
      </select>
      <paginate
        :page-count="Math.floor(stats.total / page)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :next-class="'next-item'"
        :prev-class="'prev-item'"
      >
      </paginate>
    </div>
    <div class="table-contents" v-if="!loader">
      <table>
        <tbody>
          <tr v-for="coin in allCoins" v-bind:key="coin.id">
            <th><img :src="coin.iconUrl" /></th>
            <th>{{ coin.name }}</th>
            <th>{{ coin.symbol }}</th>
            <th>{{ base.sign }}{{ parseFloat(coin.price).toFixed(4) }}</th>
            <th :class="{ red: coin.change < 0, green: coin.change >= 0 }">
              {{ coin.change }}%
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loader" class="loader">Refreshing Data...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Paginate from "vuejs-paginate";
import "../css/Coins.css";

export default {
  name: "Coins",
  components: {
    Paginate,
  },
  data() {
    return {
      polling: null,
      page: 10,
      offset: 0,
      initial: true,
    };
  },
  watch: {
    page: function (value) {
      this.getCoinData({ limit: value, offset: this.offset });
    },
  },
  methods: {
    ...mapActions(["getCoinData"]),
    clickCallback: function (pageNumber) {
      this.offset = pageNumber * this.page;
      this.getCoinData({ limit: this.page, offset: pageNumber * this.page });
    },
  },
  computed: mapGetters(["allCoins", "base", "stats", "loader"]),
  created() {
    if (this.initial) {
      this.getCoinData({ limit: this.page, offset: this.offset });

      this.initial = false;
    }
    this.polling = setInterval(() => {
      this.getCoinData({ limit: this.page, offset: this.offset });
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>
