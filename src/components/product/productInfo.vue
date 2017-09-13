<template>
  <div class="tmpl">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :imgList="lunboList"></swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{productList.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span>市场价：
              <del>￥{{productList.market_price}}</del>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售价：
              <span class="sale_price">￥{{productList.sell_price}}</span>
            </span>
          </div>
          <div class="count">
            <span>购买数量：</span>
            <numberBox></numberBox>
          </div>
          <div class="btns">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{productList.goods_no}}</p>
          <p>库存情况：{{productList.stock_quantity}}件</p>
          <p>上架时间：{{productList.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <br>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import swipe from "../subcom/swipe.vue"
  import config from "../../js/Webconfig.js"
  import numberBox from "../subcom/number.vue"
  export default {
    data(){
      return {
        id:this.$route.params.id,
        lunboList:[],
        productList:{}
      }
    },
    created(){
      this.getLunbo();
      this.getProductInfo();
    },
    methods:{
      getLunbo(){
        this.$http.get("api/getthumimages/" + this.id).then(res=>{
          if(res.body.status === 0){
            res.body.message.forEach(item =>{
              item.img = config.imgBaseURL + item.src;
            });
            this.lunboList = res.body.message;
          }else{
            console.log("获取失败");
          }
        });
      },
      getProductInfo(){
        this.$http.get("api/goods/getinfo/"+this.id).then(res =>{
          if(res.body.status === 0){
            this.productList = res.body.message[0];
          }else{
            console.log("获取失败");
          }
        });
      },
      goDesc(id){
        this.$router.push("/home/productdesc/" + id);
      },
      goComment(id){
        this.$router.push("/home/productcomment/" + id)
      }
    },
    components:{swipe,numberBox}
  }
</script>
<style type="text/less" scoped>
  .tmpl {
    background-color: #EEE;
    overflow: hidden;
  }
  .sale_price {
    color: red;
    font-size: 18px;
  }
  .mui-card-content-inner>div {
    margin: 10px 0;
  }
  .mui-card-footer {
    display: block;
  }
</style>