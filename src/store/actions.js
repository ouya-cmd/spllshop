const actions = {
    addCart({ state, commit }, info) {
        return new Promise((resolve, reject) => {
            let oldproduct = state.cartList.find(item => item.iid === info.iid)

            if (oldproduct) {
                // oldproduct.count += 1;
                resolve('商品加一');
                reject('商品加一錯誤')
                commit('addcounter', oldproduct);
            } else {
                // context.state.cartList.push(payload);
                info.count = 1;
                info.checked = true;
                commit('addtocart', info);
                resolve('商品添加成功');
                reject('商品添加錯誤')
            }
        })


    }
}
export default actions
// addCart({ state, commit }, info) {

//     let oldproduct = state.cartList.find(item => item.iid === info.iid)

//     if (oldproduct) {
//         // oldproduct.count += 1;
//         commit('addcounter', oldproduct);
//     } else {
//         // context.state.cartList.push(payload);
//         info.count = 1;
//         info.checked = true;
//         commit('addtocart', info);
//     }
// }