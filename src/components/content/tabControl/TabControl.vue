<!-- TabControl -->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item" 
    class="tab-control-item" :class="{active:index===currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentIndex:0
    };
  },
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  },
}

</script>
<style scoped>
.tab-control{
  display: flex;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
}
.tab-control .tab-control-item{
  flex: 1;
}
.tab-control .tab-control-item span{
  padding: 7px;
}
.active{
  color: pink;
}

.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>