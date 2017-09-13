import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var goods = JSON.parse(localStorage.getItem('goods') || '[]');

// 创建并导出一个 公共的 store 对象
export default new Vuex.Store({
  state: {
    car: goods
  },
  mutations: {
    // 规定，如果调用这个方法，必须传递一个 goods 对象，类似于： { id:'商品Id', count:'购买数量' }
    addToShopCar(state, goods) {
      // 在 push 到 car 之前，先检查 购物车中，之前有没有相同Id的商品数据，如果有，则只修改count值，否则，直接push
      // 定义 一个 标识，如果为 false，标识 购物车中，没有此类商品，可以直接push
      var flag = false;
      //  Array.prototype.some 是用来查找数组中，是否包含某一项数据，如果有，则return true,直接退出循环
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count += goods.count;
          // 将标识符设置为 true，标识找到了对应的商品，已经修改了数量值
          flag = true;
          return true;
        }
      });
      // 如果 flag 为 false，表示，car 中之前并没有添加过此类商品，需要重新push进去
      if (!flag) {
        state.car.push(goods);
      }

      // 每当修改了购物车，都把最新的商品保存到本地
      localStorage.setItem('goods', JSON.stringify(state.car));
    },
    resetGoodsCount(state, goods) { // 重新设置商品的数量
      state.car.some(item => {
        if (item.id == goods.id) {
          item.count = goods.count;
          return true;
        }
      });

      // 每当修改了购物车，都把最新的商品保存到本地
      localStorage.setItem('goods', JSON.stringify(state.car));
    },
    delGoodsById(state, id) { // 根据指定的商品Id，从 car 中删除对应的 商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      
      // 每当修改了购物车，都把最新的商品保存到本地
      localStorage.setItem('goods', JSON.stringify(state.car));
    }
  }
});