import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('./views/Home.vue');
const Detail = () => import('./views/Detail.vue');
const Order = () => import('./views/Order.vue');
const OrderDetail = () => import('./views/Order_Detail.vue');
const OrderList = () => import('./views/Order_List.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home',
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      meta: {
        title: '立即预定'
      }
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '我的订单'
      }
    }
  ]
});
