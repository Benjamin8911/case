import Assets from '../components/main/assets/assets.vue'
import RollIn from '../components/main/assets/rollIn.vue'
import RollOut from '../components/main/assets/rollOut.vue'
import TDCode from '../components/main/assets/TDCode.vue'
import Record from '../components/main/assets/record.vue'
import CreateWallet from '../components/main/assets/createWallet.vue'
import ImportWallet from '../components/main/assets/importWallet.vue'
import BackUpWallet from '../components/main/assets/backUpWallet.vue'
import EditPassword from '../components/main/assets/editPassword.vue'
import WalletDetail from '../components/main/assets/walletDetail.vue'
import CoinDetail from '../components/main/assets/coinDetail.vue'
import ExportKeystore from '../components/main/assets/exportKeystore.vue'
import TransactionDetail from '../components/main/assets/transactionDetail.vue'
import MappingDescription from '../components/main/assets/mappingDescription.vue'
import Mapping from '../components/main/assets/mapping.vue'

const assetsRoutes = [
    {
        path: '/assets',
        component: Assets,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light', //light 白色  dark 黑色
            tabbar: true,
            isQuit: true
        }
    },
    {
        path: '/rollIn',
        component: RollIn,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/rollOut',
        component: RollOut,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/TDCode',
        component: TDCode,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/record',
        component: Record,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/createWallet',
        component: CreateWallet,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/importWallet',
        component: ImportWallet,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/backUpWallet',
        component: BackUpWallet,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/editPassword',
        component: EditPassword,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/walletDetail',
        component: WalletDetail,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/coinDetail',
        component: CoinDetail,
        meta: {
            BarBackground: '#181A2A',
            BarStyle:'light' //light 白色  dark 黑色
        }
    },
    {
        path: '/exportKeystore',
        component: ExportKeystore,
        meta: {
            BarBackground: '#FFFFFF',
            BarStyle:'dark' //light 白色  dark 黑色
        }
    },
    {
        path: '/transactionDetail',
        component: TransactionDetail,
        meta: {
            BarBAckground: '#181A2A',
            BarStyle: 'light' //light 白色  dark 黑色
        }
    },
    {
        path:'/mappingDescription',
        component: MappingDescription,
        meta:{
            BarBAckground: '#181A2A',
            BarStyle: 'light' //light 白色  dark 黑色
        }
    },{
        path: '/mapping',
        component: Mapping,
        meta: {
            BarBAckground: '#FFFFFF',
            BarStyle: 'dark' //light 白色  dark 黑色
        }
    }
]

export default assetsRoutes