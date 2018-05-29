// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// import VueRouter from 'vue-router';
// import goods from './components/goods/goods.vue';
Vue.config.productionTip = false

/* eslint-disable no-new */

// Vue.use(VueRouter);

// const routes = [
//   {path: '/goods', components: goods}
// ];

// let router = new VueRouter({
//   routes
// });

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
