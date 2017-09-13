<template>
  <div>
    <comment :artId="$route.params.id"></comment>
  </div>
</template>

<script>
// 导入评论组件
import comment from '../subcom/comment.vue'

export default {
  components: { comment }
}
</script>

<style lang="scss" scoped>

</style>
