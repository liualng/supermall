<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calculate">去计算({{ckeckLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  data() {
    return {};
  },

  components: {
    CheckButton,
  },

  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    ckeckLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },

  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.commit("allDeSelected");
      } else {
        this.$store.commit("allSelected");
      }
    },
    calculate() {
      // 全部没有选中
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: relative;

  height: 40px;
  background-color: #eee;
  line-height: 40px;
  text-align: center;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 80px;
}
.check-button {
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: red;
  color: #fff;
}
</style>