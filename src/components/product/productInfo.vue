<template>
  <div class="tmpl">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isshow"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :imgList="lunboList"></swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">

          <div class="price">
            <span>市场价：
              <del>￥{{goodsInfo.market_price}}</del>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售价：
              <span class="sale_price">￥{{goodsInfo.sell_price}}</span>
            </span>
          </div>

          <div class="count">
            <span>购买数量：</span>
            <!-- 在使用 number box的时候，把最大值传递进去 -->
            <numberbox :maxcount="goodsInfo.stock_quantity" @getNum="getNum"></numberbox>
          </div>

          <div class="btns">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </div>

        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsInfo.add_time | dataFormat}}</p>
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
  import numberbox from "../subcom/number.vue"
  export default {
     data() {
    return {
      id: this.$route.params.id, // 商品Id
      lunboList: [], // 存放轮播图的数组
      goodsInfo: {}, // 要展示的商品详情数据
      isshow: false,
      goodsCount: 1 // 默认选中的商品数量
    }
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      // 注意：获取轮播图的 API 地址，和 获取 图片详情缩略图 是同一个API，地址都为 /api/getthumimages/:imgid
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        if (res.body.status === 0) {
          // 循环每一个获取到的轮播图数据对象，改造成合法的，可以交给 轮播图组件展示的 数据
          res.body.message.forEach(item => {
            item.img = config.imgBaseURL + item.src;
          });
          // 把获取到的数据， 保存到 data 上
          this.lunboList = res.body.message;
        } else {
          console.log('获取轮播图数据失败！');
        }
      });
    },
    getGoodsInfo() { // 获取商品的详情
      this.$http.get('api/goods/getinfo/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodsInfo = res.body.message[0];
        } else {
          console.log('获取商品详情失败！');
        }
      });
    },
    goDesc(id) { // 点击跳转到商品描述页面
      this.$router.push('/home/productdesc/' + id);
    },
    goComment(id) { // 点击跳转到商品评论
      this.$router.push('/home/productcomment/' + id);
    },
    addToShopCar() { // 点击添加到购物车
      this.isshow = !this.isshow;
      // 每当点击 添加购物车按钮，触发 store 上的 addToShopCar 方法，将商品添加到购物车
      this.$store.commit('addToShopCar', { id: this.id, count: this.goodsCount });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(86px, " + (225 + window.pageYOffset) + "px)";
      done();
    },
    afterEnter(el) {
      this.isshow = !this.isshow;
    },
    getNum(num) { // 父组件获取子组件传递过来的 商品数量
      this.goodsCount = num;
    }
  },
  components: {swipe, numberbox }
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