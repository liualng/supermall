import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 解决跳转到本路径打印错误信息
 */
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

// 懒加载
const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")
const Detail = () => import("views/detail/Detail")
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router