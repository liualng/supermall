<!-- Scroll -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    // 1.scroll中的button可以监听点击
    // 2.scroll中的div必须要加click:true才能监听点击
    // 3.可计算高度不包括图片高度(图片加载缓慢的情况下) refresh函数可以重新计算高度
    const bscroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
    });
    // 监听滚动
    if (this.probeType === 2 || this.probeType === 3) {
      bscroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 监听上拉加载
    if (this.pullUpLoad) {
      bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    this.scroll = bscroll;
  },
  methods: {
    // 滚动定位
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    // 完成上拉加载
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // 图片加载完成，refresh刷新scrollHeight
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>
<style scoped>
</style>