<template>
  <!-- 大盒子確定內容不會超出 -->
  <div id="hy-swiper">
    <!-- 這個盒子用來裝圖片的插槽 -->
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>

    <!-- 這個盒子用來裝對應圖片小圓點的插槽的插槽 -->
    <div class="indicator">
      <!-- 當有showIndicator為true(錄播圖需要小圓點)並且slideCount（圖片）個數大於1的時候顯示插槽 -->
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
          @click="jump(index)"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // 自定義4組數據單父組件沒有傳遞函數的時候將其自定義為默認的數據

    // 时间间隔（多久執行一次）
    interval: {
      type: Number,
      default: 3000,
    },

    // 持续时间（執行一次所用時間）
    animDuration: {
      type: Number,
      default: 300,
    },
    // 移動比例（滑動面積超過這個百分比的時候執行）
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    // 想不想有輪播圖下的小圓點
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 初始化數據
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    };
  },
  // mounted生命週期行數【在dom數據掛載完成時候執行】執行一個定時函數3秒執行一次
  mounted() {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 600);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer() {
      // 對playTimer進行方法發包裝，包裝的內容是window的延時處理事件
      this.playTimer = window.setInterval(() => {
        // data中數據處理
        this.currentIndex++;
        // console.log(this.currentIndex);
        // 觸發scrollContent並且回傳-this.currentIndex * this.totalWidth
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      // 清空當前的playTimer
      // clearInterval()方法取消使用的setInterval() 创建的重复动作。
      // setInterval()返回的ID值用作clearInterval()方法的参数。
      // 注意：为了能够使用clearInterval()方法，在创建interval方法时必须使用一个变量：
      // t = setInterval("javaScript function", milliseconds);
      // 然后，您可以通过调用clearInterval()方法来停止执行：
      // clearInterval(t);

      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent(currentPosition) {
      // 0.设置正在滚动
      // 觸發事件之後將data中scrolling改為true
      this.scrolling = true;

      // 1.开始滚动动画 this.swiperStyle.transition=transform 300ms ease 0s (變化效果的延時處理)
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      // console.log(this.swiperStyle.transition);
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 校验正确的位置
     */
    checkPosition() {
      // 之前這個函數是放在定時器裡面的但是這樣會造成最後一張圖片跳轉到第一張圖片的時候
      // 小圓點的變化出現this.animDuration的延時
      if (this.currentIndex >= this.slideCount + 1) {
        this.currentIndex = 1;
        this.cpmove();
      } else if (this.currentIndex <= 0) {
        // 如果你衝0開始向左滑動那麼就將你的定位變成拼接完成的數據的倒數第二個元素的位置
        this.currentIndex = this.slideCount;
        this.cpmove();
      }
      // window.setTimeout(() => {
      //   // 1.校验正确的位置
      //   // 由於在圖片前後拼接上了2個元素所以this.currentIndex的最大值比slideCount打1
      //   // 所以當this.currentIndex >= this.slideCount + 1也是圖片走到了最後一張圖片
      //   // 此時需要重新定位到第一張圖片的位置
      //   // this.swiperStyle.transition = "0ms";
      //   // if (this.currentIndex >= this.slideCount + 1) {
      //   //   this.currentIndex = 1;
      //   //   this.setTransform(-this.currentIndex * this.totalWidth);
      //   // } else if (this.currentIndex <= 0) {
      //   //   // 如果你衝0開始向左滑動那麼就將你的定位變成拼接完成的數據的倒數第二個元素的位置
      //   //   this.currentIndex = this.slideCount;
      //   //   this.setTransform(-this.currentIndex * this.totalWidth);
      //   // }
      //   this.swiperStyle.transition = "0ms";
      //   this.setTransform(-this.currentIndex * this.totalWidth);
      //   // 2.结束移动后的回调
      //   // 子组件使用this.$emit()向父组件传值（回傳名稱transitionEnd數據是this.currentIndex - 1也就是第幾張圖）
      //   // this.$emit("transitionEnd", this.currentIndex - 1);
      // }, this.animDuration);
    },
    cpmove() {
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        // console.log(this.swiperStyle.transition);
        this.setTransform(-this.currentIndex * this.totalWidth);
      }, this.animDuration);
   
    },

    /**
     * 设置滚动的位置
     */
    setTransform(position) {
      // swiperStyle的元素左邊等於之後的3d x y z的位置其中初始的position值是-this.totalWidth
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      // -webkit 是表示针对 safari 浏览器支持，-ms表示针对 IE 浏览器支持。
      //  如下表示的是在 X 轴向右移动 50px, Y 轴向下移动 100px。
      // div {
      //  -ms-transform: translate(50px, 100px);
      //  -webkit-transform: translate(50px, 100px);
      //    transform: translate(50px, 100px);
      // 兼容性處理
      // ${表达式}用来输出或者计算一个表达式的内容
      this.swiperStyle["-webkit-transform"] = `translate3d(${position}px),0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom() {
      // 1.获取要操作的元素
      // 1.大盒子下的放圖片的大盒子（放圖片的總盒子，父親的爺爺）
      let swiperEl = document.querySelector(".swiper");
      // 2.大盒子裡面的插槽，裝照片（照片的父級）
      let slidesEls = swiperEl.getElementsByClassName("slide");

      // 2.保存个数（獲取圖片的個數）
      this.slideCount = slidesEls.length;

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        // cloneNode(true)完全把真节点的东西给复制了过来
        // 複製第一個圖片元素
        let cloneFirst = slidesEls[0].cloneNode(true);
        // 複製最後一個圖片元素
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);

        // 將複製的最後一個元素添加進入子元素最前面（的用法）
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        // 將複製的最前面的元素添加在子元素的最後面（的用法）
        swiperEl.appendChild(cloneFirst);

        // offsetWidth返回元素的寬度(操作的界面的寬度)
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
        // console.log(swiperEl.offsetWidth);
        // console.log(this.swiperStyle);
      }

      // 4.让swiper元素, 显示第一个(目前是显示添加的最后一个元素,也就是第一個元素)
      this.setTransform(-this.totalWidth);
    },

    /**
     * 拖动事件的处理
     */
    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;
      console.log("手指按下");
      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      // this.startX是我們按下的時候手指距離手機左邊的距離
      // this.currentX是我們現在手指距離手機左邊我位置
      // this.distance = this.currentX - this.startX;
      // 說明要是this.distance大於零就是我們手指右移（返回上一張圖片）
      // 說明要是this.distance小於零就是我們手指左移（進入下一張圖片）

      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向左移动超过0.5
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 4.移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个, 下一个
     */
    // {想不想}按鈕跳轉土騙的方法
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },

    jump(index) {
      // 點擊小團點跳轉到相應的位置
      // 1.移除定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex = index + 1;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 3.添加定时器（開啟定時器）
      this.startTimer();
    },
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
