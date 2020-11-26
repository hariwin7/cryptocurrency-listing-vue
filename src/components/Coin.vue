<template>
  <div class="heading">
    <!-- {{ coin }} -->
    <img :src="coin.iconUrl" />
    <label>{{ coin.name }}</label>
    <label>{{ coin.symbol }}</label>
    <label>{{ base.sign }}{{ coin.price }}</label>
    <label :class="{ red: coin.change < 0, green: coin.change >= 0 }"
      >{{ coin.change }}%</label
    >
  </div>
</template>

<script>
export default {
  name: "Coin",
  props: ["coin", "base"],
};
</script>

<style>
.heading {
  font-size: 25px;
}
.heading img {
  width: 2.5rem;
  padding-right: 1rem;
}
.heading label {
  padding: 0 1rem 0 1rem;
}
.red {
  color: red;
}
.green {
  color: rgba(137, 214, 20, 0.801);
}
</style>