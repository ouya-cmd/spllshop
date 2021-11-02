<template>
<goods-list>
  <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem="item"></goods-list-item>
</goods-list>

</template>

<script>
import { GoodsList, GoodsListItem } from "components/content/goods/GoodIndex";



export default {
  name: "MainGoods",
  components: {
    GoodsList,
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
</style>