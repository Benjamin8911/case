import About from '../components/main/about/about.vue'
import ContactList from '../components/main/about/contactList.vue'
import SafeCenter from '../components/main/about/safeCenter.vue'
import Setting from '../components/main/about/setting.vue'
import AboutUs from '../components/main/about/aboutUs.vue'
import CreateContact from '../components/main/about/createContact.vue'
import EditLoginPassword from '../components/main/about/editLoginPassword.vue'
import BindEmail from '../components/main/about/bindEmail.vue'
import BindPhone from '../components/main/about/bindPhone.vue'
import SetLanguage from '../components/main/about/setLanguage.vue'
import SetCurrency from '../components/main/about/setCurrency.vue'
import Agreement from '../components/main/about/agreement.vue'
import Question from '../components/main/about/question.vue'

const aboutRoutes = [
    {
        path: '/about',
        component: About,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light', //白色  dark为黑色
            tabbar: true,
            isQuit: true
        }
    },
    {
        path: '/contactList',
        component: ContactList,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/safeCenter',
        component: SafeCenter,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/setting',
        component: Setting,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/aboutUs',
        component: AboutUs,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/createContact',
        component: CreateContact,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/editLoginPassword',
        component: EditLoginPassword,
        meta: {
            passAuth: true,
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/bindEmail',
        component: BindEmail,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/bindPhone',
        component: BindPhone,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/setLanguage',
        component: SetLanguage,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/setCurrency',
        component: SetCurrency,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/agreement',
        component: Agreement,
        meta: {
            passAuth: true,
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/question',
        component: Question,
        meta: {
            passAuth: true,
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    }
]

export default aboutRoutes