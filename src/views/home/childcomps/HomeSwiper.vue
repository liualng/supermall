<!-- HomeSwiper -->
<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,key) in banners.list" :key="key">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 一张图片加载完成就知道高度了
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = !this.isLoad;
      }
    },
  },
};
</script>
<style scoped>
</style>