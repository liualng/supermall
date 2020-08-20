import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import {
  Icon
} from 'vant'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  // 图片未加载完成时显示的图片
  loading: require('./assets/img/common/placeholder.png')
})
//解决移动端300ms延迟 
FastClick.attach(document.body)
// 安装toast插件
Vue.use(toast)

Vue.use(Icon)
Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
