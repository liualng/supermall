<!--  -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
}

</script>
<style scoped>
 #tab-bar{
   height: 49px;
   display: flex;
   background-color: #f6f6f6;
 }
</style>