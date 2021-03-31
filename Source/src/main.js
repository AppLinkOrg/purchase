// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from "weixin-jsapi"; 
import 'lib-flexible/flexible.js';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.wx = wx
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {

//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   console.log()
//   next()
// })
