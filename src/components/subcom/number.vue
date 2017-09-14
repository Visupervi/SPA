<template>

  <div class="mui-numbox" data-numbox-min='1' style="height:28px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input ref="numbox" class="mui-input-numbox" type="number" value="1" @change="numChage" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

</template>
<script type="text/javascript">
// 1. 导入 mui JS脚本
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted() {
    // 当组件挂载到DOM上之后，初始化 numberbox
    mui('.mui-numbox').numbox();
    // console.log(this.maxcount);
    // mui('.mui-numbox').numbox().setOption('max', this.maxcount);
  },
  props: ['maxcount'],
  watch: {
    maxcount(newVal) {
      mui('.mui-numbox').numbox().setOption('max', newVal);
      console.log(newVal);
    }
  },
  methods: {
    numChage() {
      // var num = mui('.mui-numbox').numbox().getValue();
      var num = parseInt(this.$refs.numbox.value);
      this.$emit('getNum', num);
    }
  }
}
</script>
<style lang="less" scoped>

</style>
