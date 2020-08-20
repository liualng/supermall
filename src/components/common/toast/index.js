/**
 * 插件封装方式
 */

import Toast from './Toast.vue'
const obj = {}
obj.install = function (Vue) {

  // 创建组件构造器
  const toastConstrstor = Vue.extend(Toast)
  // 创建组件对象
  const toast = new toastConstrstor()
  // 手动挂载到某一个元素上面
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}


export default obj
