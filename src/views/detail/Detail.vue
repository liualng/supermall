<!-- Detail -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods-info="goods" />
      <detail-shop-info :shop-info="shop" />
      <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info :params-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="commnet" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick()" v-show="isShowBackTop" />
  </div>
</template>

<script>
// components
import DetailNavBar from "views/detail/childcomps/DetailNavBar";
import DetailSwiper from "views/detail/childcomps/DetailSwiper";
import DetailBaseInfo from "views/detail/childcomps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childcomps/DetailShopInfo";
import DetailImageInfo from "views/detail/childcomps/DetailImageInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailParamsInfo from "views/detail/childcomps/DetailParamsInfo";
import DetailCommentInfo from "views/detail/childcomps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "views/detail/childcomps/DetailBottomBar";
import BackTop from "components/content/backtop/BackTop";
import { debounce } from "common/util.js";
// import { itemListenerMixin } from "common/mixin.js";

// network
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  // mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      isShowBackTop: false,
      currentIndex: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [0, 1000, 2000, 3000],
    };
  },
  // keep-alive 组件不会被销毁，则created不会重复执行，iid不变
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // console.log(data);
      // 1.获取顶部的轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数信息
      this.paramInfo = data.itemParams;
      // 6.评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    // 图片完成加载是刷新scroll的可滚动高度
    imageLoad() {
      this.$refs.scroll.refresh();

      // 图片加载完成后,获取组件offsetTop
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.commnet.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    // 标题切换
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    // 处理监听滚动发出的scroll事件
    contentScroll(position) {
      const positionY = -position.y;
      // 1.判断back-top是否显示
      this.isShowBackTop = positionY > 1000;
      // 2.滚动到对应位置切换标题栏
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // 当前索引不需要比较
        if (this.currentIndex !== i) {
          // 用区间判断索引
          if (
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]
          ) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
          }
        }
      }
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 添加到购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res);
      });
    },
  },
  mounted() {
    // 1.监听GoodsListItem图片加载完成发出的全区事件
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);

    // 2.获取个组件topOffset
    // 数据在created中异步请求，在mounted中，
    // 数据可能没有请求完毕，导致组件没有渲染，则topOffset undefined
  },
  destroyed() {
    // 1.取消全局事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  updated() {},
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 1000;
  height: 100vh;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>