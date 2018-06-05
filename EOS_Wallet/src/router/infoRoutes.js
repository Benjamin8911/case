import Info from '../components/main/information/info.vue'
import InfoDetail from '../components/main/information/infoDetail.vue'
import infoSearch from '../components/main/information/infoSearch.vue'

const infoRoutes = [
    {
        path: '/info',
        component: Info,
        meta: {
            tabbar: true,
            BarStyle:'light' //白色  dark为黑色
        }
    },
    {
        path: '/infoDetail/:id',
        component: InfoDetail,
        meta: {
            BarStyle:'light' //白色  dark为黑色
        }
    },
    {
        path: '/infoSearch',
        component: infoSearch,
        meta: {
            BarStyle:'light' //白色  dark为黑色
        }
    }
]

export default infoRoutes