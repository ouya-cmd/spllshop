<template>
  <div class="goods-list-item" @click="goodItemClick">
    <!-- image.load 图片加载完成执行这个函数（原生js）vue中已有封装好的方法 -->
    <img :src="goodsitem.show.img" alt="" @load="imageLoad"/>
    <!-- <img v-lazy='goodsitem.show.img' alt="" @load="imageLoad"/> -->
    <div class="goods-info">
      <p>{{ goodsitem.title }}</p>
      <span class="price">{{ goodsitem.price }}</span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
// 跳转到详情页2种方法
    goodItemClick(){
      // console.log('cc');
      // 1.动态路由
      this.$router.push("/detail/"+this.goodsitem.iid);
      // 2.query
      //  this.$router.push({
      //    path:"/detail",
      //    query:{

      //    }

      //  })

    }
  },
};
</script>


<style scoped>
/* 作用域scoped */
.goods-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>