import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import information from '@/components/information'
import purchasesucess from '@/components/purchasesucess'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/information',
      name: 'information',
      component: information,
      meta:{
        title:'wwww'
      }
    }, {
      path: '/purchasesucess',
      name: 'purchasesucess',
      component: purchasesucess
    }
  ]
})
