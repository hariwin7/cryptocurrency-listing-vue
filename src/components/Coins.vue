<template>
  <div class="coins">
    <h2>Cryptocurrency prices</h2>
    <div v-for="coin in allCoins" v-bind:key="coin.id">
      <Coin :coin="coin" :base="base" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Coin from "./Coin";
export default {
  name: "Coins",
  data() {
    return {
      polling: null,
    };
  },
  components: {
    Coin,
  },
  methods: {
    ...mapActions(["getCoinData"]),
  },
  computed: mapGetters(["allCoins", "base"]),
  created() {
    // this.polling = setInterval(() => {
    this.getCoinData({ limit: 10, offset: 15 });
    // }, 10000);
  },
  beforeDestroy() {
    // clearInterval(this.polling);
  },
};
</script>

<style>
.coins {
  display: flex;
  /* align-items: center; */
  flex-direction: column;
}
</style>
