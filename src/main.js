import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import FastClick from 'fastclick';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './style/reset.less';
import axios from './utils/ajax';

Vue.use(MintUI);
Vue.prototype.$get = axios.get;

FastClick.attach(document.body);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //跳转前动态设置当前title
    document.title = to.meta.title;
  }
  next();
});
