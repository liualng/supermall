<!-- GoodsList -->
<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" 
    class="goods-item" :key="index"/>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
  data() {
    return {};
  },
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
}


</style>