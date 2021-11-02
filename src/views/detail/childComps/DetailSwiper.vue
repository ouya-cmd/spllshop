<template>
  <swiper class="detail-swiper" :interval=2000>
    <swiper-item
      v-for="(item, index) in childdetailData"
      :key="index"
      class="saveimg"
    >
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    childdetailData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      iid: null,
    };
  },
  created() {
    // console.log(this.childdetailData);
  },
  destroyed() {
    console.log("校徽");
  },
};
</script>

<style scoped>
.saveimg {
  box-sizing: content-box;
  height: 300px;
}
</style>