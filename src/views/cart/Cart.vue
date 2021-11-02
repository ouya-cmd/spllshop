<template>
  <div id="cart" class="Cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar :cart-list="bottombar"></cart-bottom-bar>
  </div>
</template>


<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
// 子组件
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

// vuex里面的计算属性
import {mapGetters} from "vuex";

export default {
   name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed:{
    ...mapGetters({
      length:'cartLength',
      bottombar:'cartList',
    })
  },
  methods:{

  }
};
</script>

<style scoped>
.cart-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.Cart{
  height: calc(100vh - 49px);
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
}
</style>