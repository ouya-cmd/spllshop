const mutations = {
    addcounter(state, payload) {
        payload.count += 1;
    },
    addtocart(state, payload) {
        state.cartList.push(payload);
    },
}
export default mutations

// const mutations = {
//     oo() {
//         // 因为mutations的操作是希望比较简单的，所以我们应该将这些内容放在actions里面
//         // addCart(state, payload) {
//         //     let oldproduct = null;
//         //     // 1.商品进入函数的时候第一次进入因为不存在所以不会执行该函数
//         //     // 3.第二次进入存在重复商品故  oldproduct =item=cartList【n】=payload;
//         //     for (let item of state.cartList) {
//         //         if (item.iid === payload.iid) {
//         //             oldproduct = item;
//         //         }
//         //     }
//         //     //  find数组的一个方法，里面也是一个方法，()中为true会回传这个方法里面的参数
//         //     // 5.如果你不想用for方法你也可以 let oldproduct=state.cartList.find(function(item){return item.iid===payload.iid})
//         //     // =>变化 let oldproduct =state.cartList.find(item =>item.iid===payload.iid)
//         //     // 2.而是执行函数，第一次oldproduct = null;执行else payload.count=1;=>因为payload是一个对象
//         //     // 2.这样相当于给payload添加一个对象对象名字是count 并且默认为一
//         //     // 4.因为oldproduct =item=cartList【n】=payload;所以oldproduct就有了count这个属性
//         //     if (oldproduct) {
//         //         oldproduct.count += 1;
//         //     } else {
//         //         payload.count = 1;
//         //         state.cartList.push(payload);
//         //     }
//         // }
//     },
//     addcounter(state, payload) {
//         payload.count += 1;
//     },
//     addtocart(state, payload) {
//         state.cartList.push(payload);
//     },
// }
// 尽量避免在state中改变state数据
// 如果要改变尽量使用响应的代码，因为mutations中改变数据是费响应的