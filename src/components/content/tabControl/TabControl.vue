<template>
  <div class="tab-control">
    <!-- 什么标签里面有v-for那就是本标签以及标签中的事物都复制n份 -->
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;

      this.$emit("tabClick", index);
      // 记录点击
    },
  },
};
</script>

<style scoped>
.tab-control {
  /* box-sizing: border-box; */
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 42px;
  line-height: 42px;
  background-color: #fff;
  /* z-index: 9; */
  /* margin-top: -1px; */
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  box-sizing: border-box;
  padding: 4px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: solid 3px rgb(255, 47, 255);
}
</style>