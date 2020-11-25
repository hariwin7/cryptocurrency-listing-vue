<template>
  <div class="coins">
    <div v-for="coin in allCoins" v-bind:key="coin.id" class="coin">
      {{ coin.id }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Coins",
  methods: {
    ...mapActions(["getCoinData"]),
  },
  computed: mapGetters(["allCoins"]),
  created() {
    this.getCoinData();
  },
};
</script>

<style></style>
