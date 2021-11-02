<template>
  <div class="child-comps">
    <nav-bar>
      <div slot="left" class="left" @click="leftClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: index === isItemClick }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBer",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      isItemClick: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.isItemClick = index;
      const ctime=this.isItemClick;
      //   console.log("cc");
      this.$emit("detailnavberjump",ctime);
    },
    leftClick() {
      //   this.$router.go(-1);
      this.$router.back();
      this.$emit("back");
      //   this.$router.go(-1);
    },
  },
};
</script>

<style scope>
.child-comps {
  position: relative;
  background-color: #fff;
  z-index: 2;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
.left img {
  width: 30%;
  height: 30%;
  margin-top: 12px;
}
</style>