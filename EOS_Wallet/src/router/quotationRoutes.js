import Quotation from '../components/main/quotation/quotation.vue'
import QuotationDetail from '../components/main/quotation/quotationDetail.vue'
import QuotationSearch from '../components/main/quotation/quotationSearch.vue'

const quotationRoutes = [
    {
        path: '/quotation',
        component: Quotation,
        meta: {
            tabbar: true,
            BarStyle:'light' //白色  dark为黑色
        }
    },
    {
        path: '/quotationDetail',
        component: QuotationDetail,
        meta: {
            BarStyle:'light' //白色  dark为黑色
        }
    },
    {
        path: '/quotationSearch',
        component: QuotationSearch,
        meta: {
            BarStyle:'light' //白色  dark为黑色
        }
    }
]

export default quotationRoutes