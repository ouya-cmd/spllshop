<template>
  <div class="detall" :key="iid" ref="detail">
    <detail-nav-ber
      class="detail-nav-ber"
      @back="back"
      @detailnavberjump="detailnavberjump"
      ref="navber"
    ></detail-nav-ber>
    <!-- ref="shop-scroll" :probe-type="3" :pull-up-load="true" -->
    <scroll
      class="shopcontent"
      ref="scroll"
      :probe-type="3"
      @pullingUp="detailpullingUp"
      :pull-up-load="true"
      :key="iid"
      @scroll="contentScroll"
    >
      <detail-swiper
        :childdetailData="detailDataSwiper"
        ref="base"
        :key="iid + 'base'"
      ></detail-swiper>
      <detail-base-info-1 :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="param"
        :key="iid + 'param'"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentinfo"
        ref="comment"
        :key="iid + 'comment'"
      ></detail-comment-info>
      <main-detail-goods
        :goods="recommendList"
        ref="recommend"
        :key="iid + 'recommend'"
        @DetailgoodItemClick="DetailgoodItemClick"
      ></main-detail-goods>
    </scroll>
    <toast :message="toasemesage" :isshow="istoast"></toast>
    <detail-botton-nav-ber
      @addToCart="addToCart"
      @shoping="shoping"
    ></detail-botton-nav-ber>
    <detail-shopadd
      v-show="isaddshop"
      :cartInfo="addshop"
      @shopback="shopback"
    ></detail-shopadd>
    <!-- <p>{{$store.state.continue}}</p> -->
  </div>
</template>

<script>
// 公共組件
import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast.vue";
// 时间戳
import { debounce } from "@/common/utils";

// 子組件
import DetailNavBer from "./childComps/DetailNavBer.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailBaseInfo1 from "./childComps/DetailBaseInfo1.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import MainDetailGoods from "./childComps/MainDetailGoods.vue";
import DetailBottonNavBer from "./childComps/DetailBottonNavBer.vue";
import DetailShopadd from "./childComps/DetailShopadd.vue";

// axios數據
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  naem: "Detail",
  data() {
    return {
      // params的值
      iid: null,
      // 请求的数据
      detailData: {},
      detailDataSwiper: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentinfo: {},
      recommendList: [],
      furl: "",
      historyiid: [],
      furl2: "",
      // 组件离顶端高度存储在这里面
      themeTop: [],
      // 方法使用防抖的方式获取上面的数组数据
      getTop: null,
      // 现在页面里顶端的距离
      scrolly: 0,
      // 记录当前navabr的isItemClick
      navbar: 0,
      // 购物车信息
      addshop: {},
      isaddshop: false,
      toasemesage: '',
      istoast: false,
    };
  },
  components: {
    DetailNavBer,
    DetailSwiper,
    DetailBaseInfo,
    DetailBaseInfo1,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    MainDetailGoods,
    DetailBottonNavBer,
    DetailShopadd,
    Toast,
  },

  watch: {
    furl() {
      //   console.log(this.furl);
      //   console.log("怎么又不变了");
      this.iid = this.furl;
      this.historyiid.push(this.iid);
      // 2.请求iid的数据
      this.getDetail(this.iid);
      // 3.请求推荐信息
      this.getRecommend();
      this.$refs.scroll.scrollTo(0, 0, 10);
    },
    //  furl2() {
    //   //   console.log(this.furl);
    //   //   console.log("怎么又不变了");
    //   this.iid = this.furl2;
    //   this.historyiid.push(this.iid);
    //   // 2.请求iid的数据
    //   this.getDetail(this.iid);
    //   // 3.请求推荐信息
    //   this.getRecommend();
    //   this.$refs.scroll.scrollTo(0, 0, 10);
    // },
  },
  created() {
    //   $router是全局路由 $rounte表示处于活跃的路由
    //   params表示的是?后面的内容
    //   http://123.207.32.32:8000/detail?iid=1m4s06m
    // 1.获取iid
    this.iid = this.$route.params.iid;
    this.historyiid.push(this.iid);
    // 2.请求iid的数据
    this.getDetail(this.iid);
    // 3.请求推荐信息
    this.getRecommend();
  },
  mounted() {
    //   const param=this.$refs.param.$el.offsetTop;
    //   const comment=this.$refs.comment.$el.offsetTop;
    //   const recommend=this.$refs.recommend.$el.offsetTop;
    // this.getTop是给最上面的参数定位的，我们在mounted()挂载的时候获取该方法
    // 但是我们不把他放在refresh();下面执行，因为refresh();的图片比较小加载的速度太快
    // 故我们将该函数放在imageLoad()；也就是大图中，大图才影响最深
    this.getTop = debounce(() => {
      this.themeTops = [0];
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    }, 100);

    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("detailimageLoad", () => {
      refresh();
      refresh();
    });
  },
  methods: {
    /*
   数据加载
   */
    getDetail(iid) {
      getDetail(iid).then((res) => {
        // console.log(res);
        let data = res.result;
        // 伦播图数据
        this.detailDataSwiper = data.itemInfo.topImages;

        //    商品信息（构造函数）
        this.shop = new Shop(data.shopInfo);
        // console.log(data);
        //获取商品顶部展示图片
        //获取商品信息
        //    商品信息（构造函数）
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //获取商品详情数据
        this.detailInfo = data.detailInfo;
        //获取商品参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 获取评论
        if (data.rate.cRate !== 0) {
          this.commentinfo = data.rate.list[0];
          //   console.log(this.commentinfo);
        }
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        // console.log(res);
        this.recommendList = res.data.list;
      });
    },
    /*事件
  监听 */
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getTop();
    },
    detailpullingUp() {
      //   console.log("到达底部");
    },
    DetailgoodItemClick(id) {
      //   console.log("父亲");
      this.$router.push("/detail/" + id);
      this.furl = id;
    },
    back() {
      //  console.log("放回");
      //  console.log(this.historyiid);
      this.furl2 = this.historyiid[length - 1];
      //   console.log(this.$route.params.iid);
      //   location.reload();
      //   this.iid = this.$router.params.iid;
      //   this.getDetail(this.iid);
      //   this.getRecommend();
    },
    detailnavberjump(ctime) {
      console.log("1");
      console.log(ctime);
      // 跳转一般是需要一些时间的，因为你跳转滚动的时候是会触发，监听滚动的行数的，若此时不给予一定的执行时间，那么程序就会报错
      this.$refs.scroll.scrollTo(0, -this.themeTops[ctime] - 1, 100);
    },
    contentScroll() {
      this.scrolly = this.$refs.scroll.positionscroll.y;
      // console.log(this.scrolly);
      // this.navbar=this.$refs.detail-nav-ber.isItemClick;
      for (let i = 0; i < this.themeTops.length - 1; i++) {
        if (
          this.scrolly <= -this.themeTops[i] &&
          this.scrolly > -this.themeTops[i + 1]
        ) {
          if (this.navbar !== i) {
            this.navbar = i;
            console.log("2");
            console.log(this.navbar);
            this.$refs.navber.isItemClick = this.navbar;
          }
          break;
        }
      }
    },
    addToCart() {
      // console.log("加入");
      // this.isaddshop = true;
      const cartitem = {};
      cartitem.iid = this.iid;
      cartitem.imgURL = this.detailDataSwiper[0];
      cartitem.title = this.goods.title;
      cartitem.desc = this.goods.desc;
      cartitem.price = this.goods.realPrice;
      // cartitem.count=1;
      // this.addshop = cartitem;
      this.$store
        .dispatch("addCart", cartitem)
        .then((res) => {
          console.log(res);
          this.toasemesage = res;
          this.istoast = true;
          setTimeout(() => {
            this.istoast =false;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shopback() {
      this.isaddshop = false;
    },
    shoping() {
      console.log("?");
      this.isaddshop = true;
      const shop = {};
      shop.iid = this.iid;
      shop.imgURL = this.detailDataSwiper[0];
      shop.title = this.goods.title;
      shop.desc = this.goods.desc;
      shop.price = this.goods.realPrice;
      shop.count = 1;
      this.addshop = shop;
    },
  },
};
</script>

<style>
.detall {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.shopcontent {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 44px;
}
.detail-nav-ber {
  background-color: #fff;
}
</style>