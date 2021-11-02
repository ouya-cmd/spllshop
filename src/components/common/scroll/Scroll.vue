<template>
  <!-- scoll官方要求是 大盒子里面包含小大盒子 来控制的 故需要用2个div来包含插槽 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// better-scroll第三三方帮助滚动的组件
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // 用scoll来暂时存储数据避免mounted()完成后数据被销毁
    return {
      scroll: null,
      message: "哈哈哈",
      positionscroll: Object,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    // click：true/false 控制盒子中点击事件是否生效
    // probeType 0/1/2/3 0/1不监听滚动 2不监听惯性滚动 3全部监听
    // pullUpLoad 为flase的时候不出触发滚动事件

    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDom: true,
      observeImage: true,
      // 默认为打开的时候是手机模式
      disableTouch: false,
      // scrollbar: true,
      // pullDownRefresh: true,
      // useTransition:false
    });

    // 2.监听滚动的位置scroll变化位置触发
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // position是现在界面滚动到的位置
      this.$emit("scroll", position);
      this.positionscroll = position;

      // console.log(position.y);
      // console.log(this.positionscroll);
    });

    // 3.监听上拉事件 当scroll堆到底部的时候触发
    this.scroll.on("pullingUp", () => {
      // console.log("到达底部");
      this.$emit("pullingUp");
    });
  },
  methods: {
    // better-scroll内部方法触发事件的时候滚动到x.y.时间是回传的time
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //  this.scroll.finishPullUp()底部触发事件
    // this.scroll.scrollTo(x, y, time) 回到当前位置
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      // +++++++++++++在函数内部添加this.scroll&&是为了确保程序不会出现bug【图片加载完成，而scroll还没创建，
      // 此时scroll还是一个空的对象，所以直接执行this.scroll.refresh()和this.scroll.scrollTo(x, y, time);
      // 相当于this.null.refresh();故程序报错，所以我们在函数调用之前添加this.scroll&&（如果是nill返回false）
      // 就不执行后面的程序】+++++++++++++++
      // 【scroll.refresh()作用是属性scroll组件】
      this.scroll && this.scroll.refresh();
      console.log("刷新完成");
    },
  },
};
</script>

<style scoped>
.content {
  overflow: hidden;
}
</style>
