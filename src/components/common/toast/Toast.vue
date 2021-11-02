<template>
  <div class="toase" v-show="isshow" >
    <div >{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
     default: 'shabi',
    },
    isshow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.toase {
  position: absolute;
  top: 45vh;
  left: 25%;
  width: 45%;
  height: 8vh;
  line-height: 8vh;
  background-color: rgba(0, 0, 0, 0.623);
  text-align: center;
  color: #fff;
}
</style>