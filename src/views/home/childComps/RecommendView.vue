<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommendchild" :key="index">
       <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      //   類型是數組默認值是【】中括號(數組沒有東西本來就默認為空【】)
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend{
    width: 100%;
    display: flex;
}
.recommendchild{
  flex: 1;
  text-align: center;
  font-size: 12px;
  padding-bottom: 25px;
  border-bottom: 10px solid rgba(47, 231, 255, 0.158);
  color: var(--color-text);
  
}
.recommendchild img{
  width: 75%;
  height: 75%;
  vertical-align: bottom;
  margin: 8px  0;
  
}
</style>