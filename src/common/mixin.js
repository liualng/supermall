import { debounce } from 'common/util.js'
export const itemListenerMixin = {
  mounted() {
    // 1.监听GoodsListItem图片加载完成发出的全区事件
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    console.log("itemListenerMixin");
  },
}