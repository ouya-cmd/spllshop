<template>
  <swiper>
    <!-- 遍歷回傳後的banners的數據 並且使用key使得標籤必須是創建的而不是覆蓋-->
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  // pops接受父組件數據
  props: {
    banners: {
      //   類型是數組默認值是【】中括號(數組沒有東西本來就默認為空【】)
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isload: true,
      time: 0,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgLoad() {
      this.time++;
      // console.log(this.time);
      if (this.time === 3) {
        this.$emit("swiperImageLoad");
      }
    },
  },
};
</script>

<style scoped>


</style>
