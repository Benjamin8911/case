import Login from '../components/login/login.vue'
import Forget from '../components/login/forgetPassword.vue'
import Agreement from '../components/login/agreement.vue'

const loginRoutes = [
    {
        path: '/login',
        component: Login,
        meta: {
            passAuth: true,
            isQuit: true,
            BarBackground: '#2B2D5C',
            BarStyle:'light' //白色  dark为黑色
        }
    },
    {
        path: '/forget',
        component: Forget,
        meta: {
            passAuth: true
        }
    },
    {
        path: '/protocol',
        component: Agreement,
        meta: {
            passAuth: true
        }
    }
]

export default loginRoutes