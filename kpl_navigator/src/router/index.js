import Layout from '@/pages/Layout/Layout'
const Index =()=>import('@/pages/Index/Index');
const AppList = () =>import ('@/pages/AppList/AppList');
const Wechat = () =>import ('@/pages/Wechat/Wechat');
const WechatList = () =>import ('@/pages/WechatList/WechatList');
const Blog = () => import ('@/pages/Blog/Blog');
const BlogList = () => import ('@/pages/BlogList/BlogList');
const SearchResult = ()=>import('@/pages/SearchResult/SearchResult');

const routerConfig = [{
        path: '/',
        redirect: '/index',
        component: Layout,
        children: [{
            path: 'index',
            component: Index,
            meta: {
                title: '首页'
            }
        },{
            path:'wechat',
            component:Wechat,
            meta:{
                title:'公众号'
            }
        },{
            path:'blog',
            component:Blog,
            meta:{
                title:'微博'
            }
        }]
    },{
        path:'/index/:num',
        component:AppList
    },{
        path:'/wechat/:num',
        component: WechatList
    },{
        path:'/blog/:num',
        component:BlogList
    },{
        path:'/result/:name',
        component:SearchResult
    }
]

export default routerConfig;
