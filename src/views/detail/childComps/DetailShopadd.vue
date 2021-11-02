<template>
  <div class="detail-shopadd">
    <div id="cart-item">
      <div class="item-selector"></div>
      <div class="item-img">
        <img :src="cartInfo.imgURL" alt="商品图片" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ cartInfo.title }}</div>
        <div class="item-desc">商品描述：{{ cartInfo.desc }}</div>

        <div class="info-bottom">
          <div class="left">￥{{ price }}</div>
          <!-- @click="shopback" -->
          <div class="right">
            <span @click="add">+</span>
            x{{ cartInfo.count }}
            <span @click="sub">-</span>
          </div>
        </div>
      </div>
    </div>
    <div>巴拉巴拉</div>
    <!-- <p>{{ $store.state.cartList }}</p> -->
    <br />
    <div class="quest" @click="ok"><button>確認添加</button></div>
    <div class="quest1" @click="shopback"><button>返回</button></div>
  </div>
</template>

<script>
export default {
  name: "DetailShopadd",
  props: {
    cartInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
 computed: {
   price(){
     return this.cartInfo.price*this.cartInfo.count
   }
 },
  created() {
    console.log("?");
  },
  methods: {
    shopback() {
      this.$emit("shopback");
    },
    add() {
      this.cartInfo.count += 1;
    },
    sub() {
      if (this.cartInfo.count == 0) {
        return;
      } else {
        this.cartInfo.count = this.cartInfo.count - 1;
      }
    },
    ok() {
      // console.log(this.cartInfo);
      // this.$store.dispatch("addCart",cartitem);
      console.log('功能未能實現');
    },
  },
};
</script>

<style scoped>
.detail-shopadd {
  width: 100%;
  height: calc(70%-58px);
  background-color: #fff;
  position: fixed;
  top: 30%;
  left: 0px;
  right: 0px;
  bottom: 58px;
  z-index: 9;
}

/* .item-selector{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

#cart-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  line-height: 40px;
}
.info-bottom span {
  border: 1px solid rgb(35, 112, 142);
}

.info-bottom .item-price {
  color: orangered;
}
.left {
  width: 50%;
  border-radius: 50%;
  color: orangered;
}
.right {
  width: 50%;
  border-radius: 50%;
  font-size: 24px;
}
.quest button {
  width: 80px;
  height: 50px;
  position: absolute;
  right: 10px;
  bottom: 15px;
  border-radius: 40%;
}
.quest1 button {
  width: 80px;
  height: 50px;
  position: absolute;
  left: 10px;
  bottom: 15px;
  border-radius: 40%;
}
</style>