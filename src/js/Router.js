// 2.0 导入 登录 和 注册 两个组件
import Vue from "vue"
import home from "../components/tabbars/HomeComponent.vue"
import member from "../components/tabbars/MemberComponent.vue"
import search from "../components/tabbars/SearchComponent.vue"
import shopCart from "../components/tabbars/ShopCartComponent.vue"
import newsList from "../components/news/newslist.vue"
import newsInfo from "../components/news/newsInfo.vue"
import shareImg from "../components/imgs/shareImg.vue"
import imgInfo from "../components/imgs/imginfo.vue"

// 2.1 导入路由模块
import VueRouter from 'vue-router'
// 2.2 将路由模块注册到 Vue 身上
Vue.use(VueRouter);
// 2.3 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/member', component: member },
    { path:"/search",component:search},
    { path:"/shopCart",component:shopCart},
    { path:"/home/newslist" ,component:newsList},
    { path:"/home/newsInfo/:id",component:newsInfo},
    { path:"/home/shareImg",component:shareImg},
    { path:"/home/imginfo/:id",component:imgInfo}
  ],
   linkActiveClass: 'mui-active'   //  官方 默认的 激活类名 是 router-link-active
});
export default router;