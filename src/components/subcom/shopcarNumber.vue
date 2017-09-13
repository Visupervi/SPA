<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:28px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input ref="numbox" class="mui-input-numbox" type="number" :value="initcount" @change="numChage" readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 1. 导入 mui JS脚本
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted() {
    // 当组件挂载到DOM上之后，初始化 numberbox
    mui('.mui-numbox').numbox();
  },
  props: ['initcount', 'id'],
  watch: {
  },
  methods: {
    numChage() {
      // 获取当前选中的数量值
      // var num = mui('.mui-numbox').numbox().getValue();
      // 使用 refs 属性获取最新的数量值
      var num1 = parseInt(this.$refs.numbox.value);
      // console.log(num + ' ---- ' + num1);
      // 拼接处一个新的数据对象，存储了当前商品最新的数量值
      var goods = { id: this.id, count: num1 };
      // 调用 store 上的 resetGoodsCount 方法，将数量同步到 store 中
      this.$store.commit('resetGoodsCount', goods);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>