<template>
  <div class="category">
    <!-- 标题栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 分类页主要区域 -->
    <category-content :categoryList="categoryList" />
  </div>
</template>
<script>
//网络请求js模块
import { getCategory } from "@/network/category.js";

//组件
import NavBar from "components/common/navbar/NavBar";
import categoryContent from "./childComps/categoryContent"; //分类页主要区域

export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
    };
  },
  created() {
    getCategory().then((res) => {
      const { list } = res.data.category;
      // console.log(list)
      this.categoryList = list;
    });
  },
  components: {
    NavBar,
    categoryContent,
  },
};
</script>
<style lang="less" scoped>
.category {
    height: calc(100vh - 49px);
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
  .category-content {
    margin-bottom: 1rem;
  }
}
</style>