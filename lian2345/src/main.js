import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import './assets/css/bootstrap.min.css'
import './assets/css/reset.less'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
