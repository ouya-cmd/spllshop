<template>
  <div class="bottom-bar">
    <div class="select-all" @click="clickAll">
      <check-button class="all-button" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{totalPrice}}￥</div>
    <div class="buy-product">去计算（{{checkedCount}}）</div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import { mapGetters } from 'vuex'
  export default {
    name: "BottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList.filter(item=>{
          //  return item.checked相当于return item.checked==true
          return item.checked
          // reduce累加括号后是preValue的初始值
        }).reduce((preValue,item)=>{
          return preValue +item.price*item.count
        },0).toFixed(2)
      },
      checkedCount(){
        // 1.筛选数组，变成只有选则结果的数组
        // 2.获取这个数组的长度
        // return this.cartList.filter(item=>{
        //   return item.checked
        // }).length
          return this.cartList.filter(item=>{
          //  return item.checked相当于return item.checked==true
          return item.checked
          // reduce累加括号后是preValue的初始值
        }).reduce((preValue,item)=>{
          return preValue +item.count
        },0).toFixed(0)


      },
      isSelectAll(){
        // 如果没有选择返回false
        if(this.cartList.length===0)return false
        // 1.this.cartList.find(item=>！item.checked) 有！号意思是查找出里面item.checked为false的元素，如果有返回true
        // 2.而现在有元素没有被选择，故返回按钮状态为flase
        // 总结：没有元素返回false有元素为false返回flase
        return !this.cartList.find(item=>!item.checked)
      }
    },
    methods:{
      clickAll(){
        console.log("---");
        if(this.isSelectAll){
          // 遍历数组将数组中的item.checked赋值为false
          this.cartList.forEach(item => item.checked=false )
        }else{
          this.cartList.forEach(item => item.checked=true )
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #eeeeee;
    position: fixed;
    bottom: 50px;
    left: 0;
    right:0;
    box-shadow: 0 -2px 3px rgba(0,0,0,.2);
    font-size: 14px;
    color: #888;
    display: flex;
    justify-content: center;
  }
  .bottom-bar .select-all{
    align-items: center;
    display: flex;
    width: 20%;
    padding-left:5px ;
  }
  .all-button{
    margin: 5px;
  }
  .bottom-bar .total-price{
    text-align: center;
    width: 50%;
    margin: auto;
    font-size: 16px;
  }
  .bottom-bar .buy-product{
    color: #fff;
    text-align: center;
    line-height: 44px;
    width: 30%;
    height: 100%;
    background-color: orangered;
  }
</style>