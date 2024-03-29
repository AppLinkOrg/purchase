import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import information from '@/components/information'
import purchasesucess from '@/components/purchasesucess'
import ceshi from '@/components/ceshi'



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
        title:'H5购买'
      }
    }, {
      path: '/purchasesucess',
      name: 'purchasesucess',
      component: purchasesucess
    }, {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    }
  ]
})
