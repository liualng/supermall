// 处理异步操作,或者有分支的操作
export default {
  // 添加到购物车
  addCart(content, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = null;

      // 1.数组中是否已有此商品
      oldProduct = content.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // 数量加一
        content.commit("addCounter", oldProduct);
        resolve('数量加一')
      } else {
        // 添加新商品
        payload.count = 1;
        content.commit("addToCart", payload);
        resolve('添加新商品')
      }
    })
  }
}