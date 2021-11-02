import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [{
        path: '',
        redirect: '/home',

    },
    {
        path: '/home',
        component: Home,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/category',
        component: Category,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/cart',
        component: Cart,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail,
        meta: {
            keepAlive: false // 不需要缓存
        }
    }

]
const router = new VueRouter({
    routes,
    mode: 'history'
})


export default router