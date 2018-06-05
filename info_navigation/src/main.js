import 'babel-polyfill'
// import './assets/css/bootstrap.min.css'
import './assets/css/reset.less'
import './assets/css/common.less'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.prototype.echarts = echarts;
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
