<template>
  <div class="goods-list">
    <div
      v-for="(item, index) in goods"
      :key="index"
      class="goods-list-item"
      @click="DetailgoodItemClick(item)"
    >
      <div>
        <!-- image.load 图片加载完成执行这个函数（原生js）vue中已有封装好的方法 -->
        <img :src="item.image" alt="" @load="detailimageLoad" />

        <div class="goods-info">
          <p>{{ item.title }}</p>
          <span class="price">{{ item.price }}</span>
          <span class="collect">{{ item.cfav }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainDetailGoods",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      //  url:'',
    };
  },
  methods: {
    detailimageLoad() {
      // 为了避免detail组件复用的刷新与home重复我们可以可以
      if(this.$route.path.indexOf('/home')==0){
           this.$bus.$emit("homeimageLoad");
      }
      else if(this.$route.path.indexOf('/detail')==0)
      {
          this.$bus.$emit("detailimageLoad");
      }
    //   console.log(this.$route.path.indexOf("/detail"));
      this.$bus.$emit("detailimageLoad");
    },
    // 跳转到详情页2种方法
    DetailgoodItemClick(item) {
      // console.log('cc');
      // 1.动态路由
      //   console.log(item);
      //   this.url = item.item_id;
      //   this.$router.push("/detail/" + item.item_id);
      const id = "1m4jogi";
      //   console.log(cc);
      this.$emit("DetailgoodItemClick", id);

      // 2.query
      //  this.$router.push({
      //    path:"/detail",
      //    query:{

      //    }

      //  })
    },
  },
};
</script>

<style scoped>
.goods-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  padding: 2px;
}
.goods-list-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
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