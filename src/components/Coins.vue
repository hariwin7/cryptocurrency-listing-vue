<template>
  <div class="coins">
    <h2>Cryptocurrency Prices</h2>
    <div class="table-contents">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Coins",
  data() {
    return {
      polling: null,
    };
  },

  methods: {
    ...mapActions(["getCoinData"]),
  },
  computed: mapGetters(["allCoins", "base"]),
  created() {
    this.polling = setInterval(() => {
      this.getCoinData({ limit: 10, offset: 0 });
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style>
.coins {
  display: flex;
  flex-direction: column;
}
.coins h2 {
  text-align: center;
}

.table-contents {
  display: flex;
  justify-content: center;
}
.table-contents table {
  font-size: 20px;
  width: 50%;
}
.table-contents img {
  width: 50px;
  padding: 1rem;
}

.red {
  color: red;
}
.green {
  color: rgba(137, 214, 20, 0.801);
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    font-size: 20px;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
