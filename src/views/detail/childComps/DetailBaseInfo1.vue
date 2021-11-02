<template>
  <div class="base-info-root" v-if="Object.keys(goods).length !== 0">
    <div class="title">{{ goods.title }}</div>
    <div class="price">
      <span class="newPrice">{{ goods.newPrice }}</span>
      <span class="oldPrice"
        ><del>{{ goods.oldPrice }}</del></span
      >
      <span class="discount">{{ goods.discount }}</span>
    </div>
    <div class="columns">
      <span v-for="(item, index) in goods.columns" :key="index">{{
        item
      }}</span>
       <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
     <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    // console.log(this.goods);
  },
};
</script>

<style scoped>
.base-info-root {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.title {
  color: #222;
}
.price {
  margin-top: 15px;
  position: relative;
}
.newPrice {
  font-size: 24px;
  margin-left: 8px;
  color: var(--color-high-text);
}
.oldPrice {
  font-size: 8px;
  margin-left: 8px;
}
.discount {
  position: absolute;
  top: 0px;
  font-size: 12px;
  padding: 2px 5px;
  margin-left: 8px;
  background-color: var(--color-high-text);
  color: #fff;
  border-radius: 8px;
}
.columns {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.columns span {
  text-align: center;
}
  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>