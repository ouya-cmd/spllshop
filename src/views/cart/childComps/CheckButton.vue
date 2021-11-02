<template>
  <div class="item-selector">
    <div class="oo" :class="{ oo1: isChecked }"></div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.icon-selector {
  position: relative;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  /* cursor: pointer; */
}

.oo {
  width: 25px;
  height: 25px;
  border: 1px solid rgb(140, 0, 255);
  border-radius: 50%;
  /* background-color: blue; */
}
.oo1 {
  background: rgba(255, 0, 85, 0.822) url(~assets/img/cart/tick.svg) no-repeat;
  background-size: 100%;
  /* background-color: red; */
}
</style>