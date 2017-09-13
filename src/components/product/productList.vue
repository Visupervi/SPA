<template>
  <div>
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <!-- 商品图片 -->
        <img :src="item.img_url" alt="">
        <h4>{{item.title}}</h4>
        <div class="info">
          <p class="price">
            <span class="nowPrice">￥{{item.sell_price}}</span>
            <span>
              <del>￥{{item.market_price}}</del>
            </span>
          </p>
          <p class="sale">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" style="margin-bottom:10px;" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
      pageIndex: 1, // 默认展示第一页数据
      goodslist: [] // 所有商品列表数据
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() { // 获取商品列表
      this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(res => {
        var result = res.body;
        if (result.status === 0) {
          // this.goodslist = result.message;
          // 每次获取到最新的数据之后，把 老数据和 新数据拼接起来，得到一个新数组，再交给 this.goodslist 保存
          this.goodslist = this.goodslist.concat(result.message);
        } else {
          console.log('获取商品列表失败！');
        }
      });
    },
    getMore() { // 点击加载更多的商品数据
      // 1. 让页码值 +1
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(id) { // 跳转到商品详情页面
      // 这是第一种编程式导航的实现方式，在调用 push 方法的时候，直接传递了一个 路由的链接
      // this.$router.push('/home/goodsinfo/' + id);

      // 下面的是第二种编程式导航实现方式，在调用 push 的时候，传递一个 配置对象进去，在配置对象身上，有 两个主要的属性：
      //   属性1： name, 表示在注册路由规则的时候，为 路由规则 起的 name 名称
      //   属性2： params 对象，表示 要在路由中传递的参数
      // this.$router.push({ name: '', params: {} });
      this.$router.push({ name: 'goodsinfo', params: { id } });
    }
  }
}
</script>
<style type="text/less" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
  }
  .goods-item{
    width: 48%;
    border: 1px solid #ccc;
    margin: 1%;
    box-shadow: 0 0 7px #aaa;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .goods-item img{
    width: 100%;
  }
  .goods-item h4{
    font-size: 14px;
  }
  .info{
    background-color: #eee;
  }
  .info p{
    margin: 0;
    margin-top: 10px;
    font-size: 13px;
  }
  .nowPrice{
    color: red;
    font-size: 15px;
    margin-right: 8px;
  }

</style>