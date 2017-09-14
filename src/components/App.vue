<template>
  <div class="app">
    <mt-header fixed title="Visupervi">
      <a slot="left" @click.prevent="goback" v-if="isshowBack">
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <router-view></router-view>
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item1" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/member">
          <span class="mui-icon mui-icon-contact">
          </span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/shopCart">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">{{count}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item1" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshowBack: false
    }
  },
  created() {
    if (this.$route.path === '/home') {
      this.isshowBack = false;
    } else {
      this.isshowBack = true;
    }
  },
  methods: {
    goback() { // 点击后退
      this.$router.go(-1);
    }
  },
  computed: {
    'count': function() {
      // 购物车中所有商品的总数量，应该从 store 中的 car 身上获取
      var c = 0;
      this.$store.state.car.forEach(item => {
        c += item.count;
      });
      return c;
    }
  },
  watch: {
    '$route': function(newVal) {
      // console.log(newVal);
      // 如果 路径等于 /home，则隐藏 后退按钮
      if (newVal.path === '/home') {
        this.isshowBack = false;
      } else {
        this.isshowBack = true;
      }
    }
  }
}
</script>
<style type="text/less">
  .app{
    padding-top: 40px;
    padding-bottom: 40px;
  }
   mt-header{
    color: #fff;
  }
  .mui-bar-tab .mui-tab-item1.mui-active {
      color: #007aff;
    }

    .mui-bar-tab .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 50px;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
</style>