// 1.1 先导入Vue模块
import Vue from 'vue'
import router from "./js/Router.js"
import config from "./js/Webconfig.js"
import VueResource from "vue-resource"
import axios from "axios"
import store from "./js/store.js"
Vue.use(VueResource);
Vue.http.options.root = config.baseUrl;

// 导入安装的 Mint-UI 组件类库
// 如果是 将所有的组件 全部引入的话，在使用 CSS Component 的时候，不必在按需引入了，直接以标签形式引入组件即可
import Mint from 'mint-ui';
// import { Swipe, SwipeItem } from 'mint-ui';
import { Switch } from 'mint-ui';
// 引入 样式
import 'mint-ui/lib/style.css'
// 3.3 将 Mint-UI 注册到 Vue 上
Vue.use(Mint);
// 使用 mui 组件
// 导入CSS样式
import './lib/mui/css/mui.min.css'
import"./lib/mui/css/icons-extra.css"
// 导入 App.vue 组件
import App from './components/App.vue'
import moment from "moment"
//  注册 缩略图预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.filter("dataFormat",function(val,pattern="YYYY-MM-DD hh:mm:ss"){
  return moment(val).format(pattern);
})
// 创建一个 Vue 实例
const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router, // 将 路由对象，挂载到 VM 实例身上
  store
});