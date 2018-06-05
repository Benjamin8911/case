import Main from '../components/main/main.vue'

import Login from '../components/login/index.vue'

import Assets from '../components/main/assets/index.vue'
import About from '../components/main/about/index.vue'
import Info from '../components/main/information/index.vue'
import Quotation from '../components/main/quotation/index.vue'

import assetsRoutes from './assetsRoutes'
import loginRoutes from './loginRoutes'
import aboutRoutes from './aboutRoutes'
import InfoRoutes from './infoRoutes'
import quotationRoutes from './quotationRoutes'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/main',
        component: Main,
        children: [
            {
                path: '',
                component: Assets,
                meta: {
                    BarBackground: '#181A2A',
                    BarStyle:'light' //白色  dark为黑色
                },
                children: assetsRoutes
            },
            {
                path: 'about',
                component: About,
                meta: {
                    BarBackground: '#181A2A',
                    BarStyle:'light' //白色  dark为黑色
                },
                children: aboutRoutes
            },
            {
                path: 'info',
                component: Info,
                children: InfoRoutes
            },
            {
                path: 'quotation',
                component: Quotation,
                children: quotationRoutes
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            passAuth: true, // 添加此字段表示不启用登录拦截
            BarBackground: '#2B2D5C',
            BarStyle:'light' //白色  dark为黑色
        },
        children: loginRoutes
    }
]

// const routes = mainRoutes.concat(assetsRoutes, loginRoutes, aboutRoutes)

export default {
    routes
}