import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Shops from '@/components/Shops'
import Hot from '@/components/Hot'
import Coupon from '@/components/Coupon'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Posts
    },
    {
      path: '/khuyen-mai/:oid?/:s?/:page?',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/nguon-tin',
      name: 'Shops',
      component: Shops
    },
    {
      path: '/khuyen-mai-hot/:oid?/:s?/:page?',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/ma-giam-gia/:oid?/:s?/:page?',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/san-pham-khuyen-mai/:oid?/:s?/:page?',
      name: 'Product',
      component: Product
    }
  ],
  mode: 'history'
})
