export default {
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  // 全部选中
  allSelected(state){
    state.cartList.forEach(item=> item.checked = true)
  },
  // 全部不选中
  allDeSelected(state){
    state.cartList.forEach(item=> item.checked = false)
  }
}