import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout/Layout'
import Index from '@/pages/Index/Index'
import EosLearn from '@/pages/EosLearn/EosLearn'
import EosInfo from '@/pages/EosInfo/EosInfo'
import EosNav from '@/pages/EosNav/EosNav'
import Article from '@/pages/Article/Article'
import Maper from '@/pages/Maper/Maper'
import Statement from '@/pages/Statement/Statement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
      name: 'Layout',
      component: Layout,
      children:[{
      	path:'index',
      	component:Index,
      	meta:{
      		title:'首页'
      	}
      },{
      	path:'eoslearn',
      	component:EosLearn,
      	meta:{
      		title:'大佬讲EOS'
      	}
      },{
      	path:'eosinfo',
      	component:EosInfo,
      	meta:{
      		title:'EOS介绍'
      	}
      },{
      	path:'eosnav',
      	component:EosNav,
      	meta:{
      		title:'EOS导航'
      	}
      },{
      	path:'article',
      	component:Article,
      	meta:{
      		title:'文章'
      	}
      },{
      	path:'map',
      	component:Maper,
      	meta:{
      		title:'全站地图'
      	}
      },{
      	path:'statement',
      	component:Statement,
      	meta:{
      		title:'免责声明'
      	}
      }]
    }
  ]
})
