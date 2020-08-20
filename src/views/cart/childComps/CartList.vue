<!--  -->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "views/cart/childComps/CartListItem";
export default {
  data() {
    return {};
  },
  computed: {
    // 商品列表
    cartList() {
      return this.$store.getters.cartList;
    },
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated() {
    // 活跃状态时，刷新y值，更新 可滚动区域
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>