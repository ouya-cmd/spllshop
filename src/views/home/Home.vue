<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control1"
      v-show="isoffsetTop"
      ref="tabcontrol1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />

    <!-- @touchmove.native="borh" @pullingUp="loadMore" -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      
    >
      <!-- 父組件向子組件傳遞banners的數組並且保存在banners中 -->
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <!-- 3个小分类 -->
      <tab-control
        ref="tabcontrol2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- <goods-list :goods="goods['pop'].list"></goods-list>  -->
      <!-- 分类的内容 -->
      <main-goods :goods="showGoods"></main-goods>
    </scroll>
    <!-- 监听组件内部事件，但是我想在组件上面实现（父组件里的子组件实例上实现时间监听）就需要在子组件实例上添加一个native -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// 公共組件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

// 子組件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import MainGoods from "./childComps/MainGoods.vue";

// axios數據
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    MainGoods,
    Scroll,
    BackTop,
  },
  data() {
    return {
      currentType: "pop",
      banners: [],
      recommends: [],
      isShow: false,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      refreshonce: 0,
      offsetTop: 0,
      isoffsetTop: false,
      homeclientWidth: [],
      saveY: {
        p: 0,
        n: 0,
        s: 0,
      },
      saveIndex: [0],
      oldIndex:0,
      scrolling:false,
    };
  },
  // 通過生命函數created在創建vue實例的時候獲取axiosd res並且通過數組banners來接受
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //  将this.$bus.$on函数中的this.$refs.scroll.refresh当作参数传给debounce方法并且封装在refresh常量中
    const refresh = this.debounce(this.$refs.scroll.refresh, 100);
    // 问题：该事件是为了解决scroll的一个bug(因为scroll会在事先给内部盒子定义一个加载好的
    // 高度但是现在由于图片未完全加载，所以会事先的空间无法存储下图片就会导致图片下拉不了)，

    // 方案：
    // 1.在main中建立一个bus的vue实例（作用与vuex（存储公共事务）的作用差不多）。
    // 2.在子组件中GoodsListItem中使用【load()（加载完成触发）】实现图片加载完成马上执行函数。
    // 3.子组件在该函数内部给bus（用$emit）发射事件监听。
    // 4.在父组件中($on)接收该事件。
    // 5.父组件（利用$refs）对另一个子组件scroll内部的refresh(）函数进行调用【refresh()（该函数是对scroll对象进行刷新=>对空间重新加载）】
    // 实现子与子的事件监听
    this.$bus.$on("itemImageLoad", () => {
      // this.$refs.scroll.refresh();
      // console.log('cc');
      refresh();
    });
  },
  beforeUpdate() {
    let w = document.querySelector("#home");
    this.homeclientWidth.push(w.clientWidth);
    if (
      this.homeclientWidth[this.homeclientWidth.length - 1] !==
      this.homeclientWidth[this.homeclientWidth.length - 2]
    ) {
      this.swiperImageLoad();
    }
    // console.log("beforeUpdate执行");
  },
  // Update(){

  // },
  computed: {
    showGoods() {
      // 回传现在所在列表下需要请求的数据的数组
      return this.goods[this.currentType].list;
    },
  },
  // 方法
  methods: {
    /*
    事件监听
    \* */
    // 流行那3个列表距离top的距离
    swiperImageLoad() {
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      // console.log('cc');
      this.offsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // this.isoffsetTop = this.$refs.scroll.positionscroll.y < -this.offsetTop;
      // console.log(this.isoffsetTop);
      this.saveY.p = -this.offsetTop;
      this.saveY.n = -this.offsetTop;
      this.saveY.s = -this.offsetTop;
      // console.log(this.offsetTop);
    },

    //  防抖函数
    //  作用：图片加载一次就刷新一次资源浪费极大，故采用防抖来操控函数节约资源
    // this.debounce回传this.$refs.scroll.refresh（scroll里面的刷新函数）开始进入函数
    // 建立一个变量先存储为空， 然后return一个方法，那么现在就变成
    // const refresh =function(...args){        ++++++++++++++++++++ if(i) printf( a );printf( b );如果i为真ab都显示如果i为假 只显示b++++++++++++++++
    //  if (timer) clearTimeout(timer)；
    //  timer =setTimeout(() => {
    //  this.$refs.scroll.refresh.apply(this,args)
    //  }, 200);}

    // 方法执行： this.$bus.$on开启refresh执行（也就是retrun中的方法），现timer = null;为flase所以执行定时器，
    // 定时器原理【先进行计时，计时完成在执行内部函数】
    // 所以现在函数存储在临时处理器中，但是在这一瞬间this.$bus.$on再次被启动，于是refres再次执行，然这次timer不为空
    // clearTimeout(timer);timer = setTimeout(() => { func.apply(this, args);}, delay);全都执行 直到this.$bus.$on关闭不在执行
    // 这次过了delay后 func.apply(this, args);开始执行所以this.$refs.scroll.refresh.apply开始执行 scroll刷新

    // timer不会立刻消失的原因是利用了setTimeout的方法来调用进行了闭包存储故不会在函数结束的时候被丢弃

    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
          // console.log("22");
        }, delay);
      };
    },

    // 识别那一组
    tabClick(index) {
      // 在该函数中我们让跳转在400毫秒内才完成，是因为我们的页面数据是动态加载的
      // 而且scroll是需要刷新获取高度的，如果不让scrollTo方法执行的时间比较长
      // 那么就不能获取到准确的时间（最远只能是第一个列表的长度）
      // console.log(index);
      if(this.scrolling==false){}
      switch (index) {
        case 0:
          this.currentType = "pop";
          this.$refs.scroll.scrollTo(0, this.saveY.p, 400);
          // console.log("p现在的y" + this.saveY.p);
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.p = this.$refs.scroll.positionscroll.y;
          break;
        case 1:
          this.currentType = "new";
          this.$refs.scroll.scrollTo(0, this.saveY.n, 400);
          // console.log("n现在的y" + this.saveY.n);
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.n = this.$refs.scroll.positionscroll.y;
          break;
        case 2:
          this.currentType = "sell";
          this.$refs.scroll.scrollTo(0, this.saveY.s, 400);
          // console.log("s现在的y" + this.saveY.s);
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.s = this.$refs.scroll.positionscroll.y;
          break;
      }
      if (this.$refs.tabcontrol2 !== null) {
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
        this.saveIndex.push(index);
        this.isoffsetTop = this.$refs.scroll.positionscroll.y < -this.offsetTop;
      }
      // console.log(this.saveIndex);
      // console.log(this.offsetTop);console.log(this.saveY.p );

      // console.log(this.$refs.tabcontrol2.saveIndex[this.$refs.tabcontrol2.saveIndex.length-2]);
    },
    backClick() {
      // this.$ref.scoll.message;
      // console.log(this.$refs.scroll.message);
      // 通过refs调用子组件scoll内部的scollTo方法（并且将父组件数据回传数据）x,y,time【回传的3个数据】
      this.$refs.scroll.scrollTo(0, 0, 100);
      // console.log(this.$refs.scroll.positionscroll);
    },
    // 显示隐藏回到顶部的方法
    contentscroll(position) {
      // this.scrolling=true;
      //  同样的效果2种做法（数据一个是发生一个是请求）
      // 1.利用this.$emit('scroll', position)函数向父组件发射里面的内容
      //  this.isShow=position.y < -1000
      // 2. 利用this.$refs.scrooll.positionscroll.y（父组件获取子组件数据）来获取子组件中的data
      //   但是这种方法我们需要先将内部函数的数据保存到变量之中=>this.positionscroll=position;
      this.isShow = this.$refs.scroll.positionscroll.y < -1000;
      this.isoffsetTop = this.$refs.scroll.positionscroll.y < -this.offsetTop;
      // console.log(this.isoffsetTop);
      // 等于下面这样操作，要具有这样的简单化思想
      // if (this.$refs.scroll.positionscroll.y < -1000) {
      //   console.log("520");
      //   this.isShow = true;
      // } else {
      //   this.isShow = false;
      // }
    this.oldIndex = this.saveIndex[this.saveIndex.length - 1];
      // console.log(this.oldIndex);
      switch (this.oldIndex) {
        case 0:
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.p = this.$refs.scroll.positionscroll.y;
          //  console.log("数组中p" + this.saveY.p);
          break;
        case 1:
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.n = this.$refs.scroll.positionscroll.y;
          // console.log("数组中n" + this.saveY.n);
          break;
        case 2:
          if (this.$refs.scroll.positionscroll.y < -this.offsetTop)
            this.saveY.s = this.$refs.scroll.positionscroll.y;
          // console.log("数组中s" + this.saveY.s);
          break;
      }
    },
    // scroll滚到底部的时候触发
    loadMore() {
      // 子组件发射的方法但scroll事件加载到底部的时候会触发该事件
      // 【当这个列表下30张图片加载完成触发该函数，继续加载新的图片】
      this.getHomeGoods(this.currentType);
      // console.log(this.currentType);
      // console.log("加载跟多了");
    },
    /*  
    请求
    \* */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 轮播图数据
        this.banners = res.data.banner.list;
        // 第二给展示的图片数据
        this.recommends = res.data.recommend.list;
      });
    },
    // 因为goods是数据类型比较多且复杂，所以当我们请求数据的时候就要对其进行一下处理，
    // 1.goods下有3个页面数据，我们如果同时请求多个页面的全部数据对资源的浪费极大，所以
    // 我们对每个页面下对其的数据进行细；故建立3个对象通过每个对象内部的page来存储我们需要获取的页码，而list用来存储
    // 页面进行到当前所需要保存的数据。
    // 2.当vue实例被创建我们通过生命周期created来对我们goods的数据进行请求，开始时将每个页面的第一夜的内容进行请求。
    // this.getHomeGoods("pop");this.getHomeGoods("new");this.getHomeGoods("sell");
    // 【过程：1."pop"回传进入type,this.goods[type].page + 1等于this.goods[pop].page + 1（0+1等于1：也就是第一页）
    // 2 getHomeGoods(pop, 1)方法回传进入network中获取http://152.136.185.210:7878/api/hy66/home/data？type=pop？page=1 的数据
    // 3. this.goods[type].list.push(...res.data.list)等于this.goods['pop'].list.push(...res.data.list)；
    //  this.goods[type].list.push(...res.data.list)=>相当于数组数据拷贝完全复制【不是push那种看似是添加进去了内容，其实是将内容作为第一个数组添加到list中】
    //  之后 this.goods[type].page + 1;下一次需要的时候请求第二页的数据】

    getHomeGoods(type) {
      //'流行', '新款', '精选'下 图片资源的请求于存储
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 刷新scroll
        // this.$refs.scroll.scroll.refresh();
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;
        // 这个函数触发后再次回到底部才会继续触发回到底部的事件
        this.$refs.scroll.finishPullUp();
        // console.log("数据加载完成 ");
      });
    },
    // 当页面加载完成，轮播图加载图片的时候执行的函数
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* background-color: rgba(0, 255, 221, 0.308); */
}

.home-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  /* 布局了，浮动起来了才能有z-index属性 */
  position: relative;
  /* background-color: #fff; */
  z-index: 1;
}
</style>
