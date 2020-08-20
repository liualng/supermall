<!-- Home -->
<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixd"
    />
    <!-- 滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <!-- REcommends -->
      <recommend-view :recommends="recommends" />
      <!-- Feature -->
      <feature-view />
      <!-- tab-control -->
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- goodslist -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 返回顶部 -->
    <!-- 监听组件要加修饰符native -->
    <back-top @click.native="backClick()" v-show="isShowBackTop" />
  </div>
</template>

<script>
// components
import HomeSwiper from "views/home/childcomps/HomeSwiper";
import RecommendView from "views/home/childcomps/RecommendView";
import FeatureView from "views/home/childcomps/FeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

// network
import { getHomeMultidata } from "network/home";
import { getHomeGoods } from "network/home";

// function
import { debounce } from "common/util.js";
export default {
  data() {
    return {
      banners: {},
      recommends: {},
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixd: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  methods: {
    /**
     * 网络请求
     */
    // 1.获取首页多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      });
    },
    // 2.获取首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
      });
    },

    /**
     * 事件监听
     */
    // 切换显示数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部
    backClick() {
      // 500ms回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听滚动
    contentScroll(position) {
      // 1.判断back-top是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixd)
      this.isTabFixd = -position.y > this.tabOffsetTop;
    },
    // 上拉加载数据
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    // 轮播图图片加载完成
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.获取首页多个数据
    this.getHomeMultidata();
    // 2.获取首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.监听item图片加载完成，并刷新scroll,要拿到dom元素
    // 函数this.$refs.scroll.refresh 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 监听事件总线的事件 itemImgLoad
    // 保存处理函数
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);

    // 2.tabControl 的offsetTop
    // 所有的组件都有一个属性 $el,用于获取组件的元素
    // 图片加载完成情况影响位置
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  //  活跃
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  // 不活跃
  deactivated() {
    // 1.保存离开时y值
    this.saveY = this.$refs.scroll.scroll.y;
    // 2.取消全局事件监听(this.$bus.$on 事件总线)
    // 传入取消监听的函数，否则是取消所有的监听函数
    this.$bus.$off("itemImgLoad",this.itemImgListener);
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  padding-bottom: 49px;
  height: 100vh;
  position: relative;
}
/* 绝对定位大小由内容决定 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99; */
}

.fixd {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 999;
}

.tab-control {
  position: relative;
  z-index: 100;
  width: 100vw;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

/* .content{
  height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
} */

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>