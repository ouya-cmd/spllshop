import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
    continue: 500,
    cartList: [],

}

// state状态： mutations:方法state+commit+count+payload ，getters:计算属性state+rootstate+getters ,actions中dispatch+commit
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {


    }
})


export default store