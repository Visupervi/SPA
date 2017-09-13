<template>
  <div class="wrap">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="baseUrl+item.img">
      </mt-swipe-item>
    </mt-swipe>

     <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span>
            <img src="../../images/menu3.png" alt="">
          </span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/shareImg">
          <span>
            <img src="../../images/menu4.png" alt="">
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/productList">
          <span>
            <img src="../../images/menu5.png" alt="">
          </span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <span>
            <img src="../../images/menu6.png" alt="">
          </span>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <span>
            <img src="../../images/menu9.png" alt="">
          </span>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <span>
            <img src="../../images/menu10.png" alt="">
          </span>
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>

  </div>
</template>
<script>
import config from "../../js/Webconfig.js"
export default {
  data(){
    return {
      baseUrl:config.baseUrl,
      list:[]
    };
  },
  created(){
    this.getCarouse();
   
  },
  methods:{
    getCarouse(){
      this.$http.get("api/getlunbo").then(res=>{
        // console.log(res.body);
        if(res.body.status === 0)
        {
          this.list = res.body.message;
        }
      });
      }
     
    }
  }

</script>
<style lang="less" scoped>
.wrap .mint-swipe {
  height: 230px;
   .mint-swipe-item:nth-child(1) {
    background-color: red;
  }
  .mint-swipe-item:nth-child(2) {
    background-color: yellow;
  }
  .mint-swipe-item:nth-child(3) {
    background-color: green;
  }
  .mint-swipe-item img {
    width: 100%;
    height: 100%;
  }
}
.mui-grid-view.mui-grid-9{
  boder:none;
  background-color: #fff;
  .mui-table-view-cell {
    border-right: none;
    border-bottom: none;
  img {
    width: 60px;
  }

}
}

</style>
