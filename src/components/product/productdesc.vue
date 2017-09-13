<template>
  <div class="tmpl">
    <h4 class="goodsdesc-title">{{info.title}}</h4>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {} // 商品描述信息
    }
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get('api/goods/getdesc/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        } else {
          console.log('获取商品描述信息失败！');
        }
      });
    }
  }
}
</script>
<style lang="scss">
.tmpl {
  padding: 3px;
}
.goodsdesc-title {
  text-align: center;
  margin: 15px 0;
  color: #26A2FF;
}
.content img {
  width: 100%;
}
</style>
