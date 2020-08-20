<template>
  <div class="category_content">
    <!-- 分类标题 -->
    <div class="title">
      <div
        :class="{active: countIndex==index}"
        v-for="(item,index) in categoryList"
        :key="index"
        @click="indexChange(index,item)"
      >{{ item.title }}</div>
    </div>
    <!-- 图片展示区域 -->
    <div class="content">
      <div v-for="(item,index) in cateContentList" :key="index">
        <!-- <a :href="item.link"> -->
        <img :src="item.image" />
        <p>{{ item.title }}</p>
        <!-- </a> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getSubCategory } from "network/category.js";
export default {
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      countIndex: 0,
      maitkey: 3627,
      cateContentList: [],
    };
  },
  created() {
    getSubCategory(this.maitkey).then((res) => {
      this.cateContentList = res.data.list;
    });
  },
  methods: {
    indexChange(index, item) {
      this.countIndex = index;
      this.maitKey = item.maitKey;
      getSubCategory(this.maitKey).then((res) => {
        this.cateContentList = res.data.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.category_content {
  height: calc(100% - 44px);
  .title {
    background-color: #f7f7f7;
    float: left;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    div {
      flex: 1;
      text-align: center;
      padding-top: 0.4rem;
    }
    div:hover {
      cursor: pointer;
    }
    .active {
      background-color: #ffffff;
      border-left: 3px solid #ff8a9d;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    float: left;
    overflow: auto;
    align-content: flex-start;
    width: 70%;
    height: 100%;
    text-align: center;
    div {
      img {
        width: 4rem;
        height: 4rem;
      }
      p {
        font-size: 0.6rem;
      }
    }
  }
}
</style>