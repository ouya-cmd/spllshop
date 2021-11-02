import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
// 解决移动端300s延迟
import FastClick from 'fastclick'

// 图片懒加载
import VueLazyload from "vue-lazyload";

//使用懒加载插件
Vue.use(VueLazyload)

// 阻止启动生产消息
Vue.config.productionTip = false


// 一个公共的Vuw实例对象，功能于vuex类似
Vue.prototype.$bus = new Vue();

// 解决移动端300s延迟(使用)
FastClick.attach(document.body)


new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')