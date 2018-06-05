import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './router'
import { Swipe, SwipeItem } from 'mint-ui'
import { plusReady } from './lib/plusReady';
import './assets/css/reset.css'
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import './assets/js/flexible.js'

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.config.productionTip = false;
VueRouter.prototype.goBack = function() {
  this.isBack = true;
  window.history.go(-1)
}
const router = new VueRouter({
  routes
});

plusReady(() => {
  var first = null;
  window.plus.key.addEventListener("backbutton", function() {
    if (!first) {
      first = new Date().getTime();
      router.goBack();
      setTimeout(function() {
        first = null;
      }, 1500);
    } else {
      if (new Date().getTime() - first < 1500) {
        window.plus.runtime.quit();
      }
    }
  });
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
