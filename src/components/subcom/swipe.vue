<template>
  <!-- 轮播图组件 -->
  <mt-swipe :auto="4000">
  <mt-swipe-item v-for="(item, i) in imgList" :key="i">
  <img v-bind:src="item.img" alt="">
</mt-swipe-item>
</mt-swipe>
</template>
<script>
  export default {
    data() {
      return {}
    },
  props: ['imgList'] // 将来 父组件，在调用这个轮播图子组件的时候，需要把 轮播的图片，通过属性传递的形式，传递给当前轮播图组件
}
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 180px;

    .mint-swipe-item {
      text-align: center;
      overflow: hidden;
    }
    .mint-swipe-item img {
      height: 100%;
    }
  }
</style>