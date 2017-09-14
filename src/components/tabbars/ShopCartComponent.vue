<template>
  <div class="shopcar">

    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="selected[i]"></mt-switch>
            <img class="thumb_img" :src="imgBaseURL + item.thumb_path">
            <div class="info">
              <h4>{{item.title}}</h4>
              <div class="box">
                <span class="price">￥{{item.sell_price}}</span>
                <!-- initcount: 初始化的数量 -->
                <!-- id: 当前商品的Id -->
                <shopcarNumberbox :initcount="goodscount[item.id]" :id="item.id"></shopcarNumberbox>
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="amount">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{totalCount}}</span> 件 总价：
              <span class="red">￥{{totalAmount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

   <!--  {{JSON.stringify(goodscount)}}<br> {{JSON.stringify(selected)}}
 -->
  </div>
</template>


<script>
import { Toast } from 'mint-ui'
import shopcarNumberbox from '../subcom/shopcarNumber.vue'
import config from '../../js/Webconfig.js'

export default {
  data() {
    return {
      imgBaseURL: config.imgBaseURL, // 图片服务器地址
      goodslist: [], // 商品列表
      selected: [] // 已经勾选的商品数组
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 拼接购物车中所有的Id字符串
      var idarr = this.$store.state.car.map(item => {
        return item.id;
      });
      if (idarr.length == 0) return;
      var isstr = idarr.join(',');
      // 请求的URL地址
      var url = 'api/goods/getshopcarlist/' + isstr;
      // 发起数据请求：
      this.$http.get(url).then(res => {
        if (res.body.status === 0) {
          for (var i = 0; i < res.body.message.length; i++) {
            this.selected.push(false);
          }
          this.goodslist = res.body.message;
        } else {
          Toast('获取购物车列表失败！');
        }
      });
    },
    del(id) { // 根据指定的商品Id，从 car 中删除对应的 商品数据
      this.$store.commit('delGoodsById', id);

      // 这是 每次重新调用后台API数据接口，获取最新的列表
      // this.goodslist = [];
      // this.getGoodsList();

      // 能够减少不必要的网络请求
      this.goodslist.some((item, i) => {
        if (item.id == id) {
          this.goodslist.splice(i, 1);
          this.selected.splice(i, 1);
          return true;
        }
      });
    }
  },
  computed: { // 计算属性
    goodscount() {
      // 创建一个空对象
      var o = {};
      // 循环遍历 store 上的 所有的 商品数据
      this.$store.state.car.forEach(item => {
        // 把商品的 Id，作为 对象 o 的键， 把商品的 count 作为对象 o 的 值
        o[item.id] = item.count;
      });
      // 循环完毕以后，这个o 身上，存的 键是 商品的 id, 值是商品的数量
      // {
      //   id:  count
      // }
      return o;
    },
    totalCount() { // 已经勾选的商品的总数量
      var c = 0;
      // 循环 selected 数组，如果循环的这一项是 false 直接忽略，如果为true，则把这一项对应的 数量加起来
      this.selected.forEach((item, i) => {
        if (item) {
          // 拿到当前这个 true 对应的商品的Id
          var id = this.goodslist[i].id;
          c += this.goodscount[id];
        }
      });
      return c;
    },
    totalAmount() { // 计算已经勾选商品的总价
      var amount = 0;
      this.selected.forEach((item, i) => {
        if (item) {
          // 获取当前这个 true 对应的商品Id
          var id = this.goodslist[i].id;
          // 获取当前 这个 true 对应的 数量
          var count = this.goodscount[id];
          // 获取当前这个 true 对应的商品单价
          var price = this.goodslist[i].sell_price;
          amount += count * price;
        }
      });
      return amount;
    }
  },
  components: { shopcarNumberbox }
}
</script>

<style lang="scss" scoped>
.shopcar {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      .thumb_img {
        width: 60px;
        height: 60px;
      }
      .info {
        flex: 1;
        h4 {
          font-size: 14px;
        }
        .box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            font-size: 16px;
            color: red;
          }
        }
      }
    }
  }

  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .amount {
      flex: 1;
    }
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>