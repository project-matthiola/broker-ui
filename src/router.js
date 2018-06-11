import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/views/Order.vue'
import Trade from '@/views/Trade.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade
    }
  ]
})
