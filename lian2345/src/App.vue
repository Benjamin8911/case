<template>
  <div id="app">
    <header class="header-nav">
        <div class="header-nav__top clearfix">
            <div class="container">
                <div class="row">
                    <div class="logo fl">
                        <img src="./assets/images/logo.png">
                        <h1>区块链导航</h1>
                    </div>
                    <ul class="fr hidden-xs hidden-sm hidden-md">
                        <li class="fl"><a href="#main-4">交易所</a></li>
                        <li class="fl"><a href="#main-5">区块链资讯</a></li>
                        <li class="fl"><a href="#main-6">区块链工具</a></li>
                        <li class="fl"><a href="#main-7">挖矿算力</a></li>
                        <li class="fl"><a href="#main-8">自媒体</a></li>
                        <li class="fl"><a href="#main-9">区块链项目</a></li>
                        <li class="fl"><a href="#main-11">行业公司</a></li>
                        <li class="fl"><a href="#main-14">区块链游戏</a></li>
                    </ul>
                    <button class="sm-button fr hidden-lg glyphicon glyphicon-list btn-info" @click="smMenuFlag=!smMenuFlag"></button>
                    <ul class="sm-menu" :class="{display:smMenuFlag}">
                        <li><a href="#main-4" @click.self="smMenuFlag=false">交易所</a></li>
                        <li><a href="#main-5" @click.self="smMenuFlag=false">区块链资讯</a></li>
                        <li><a href="#main-6" @click.self="smMenuFlag=false">区块链工具</a></li>
                        <li><a href="#main-7" @click.self="smMenuFlag=false">挖矿算力</a></li>
                        <li><a href="#main-8" @click.self="smMenuFlag=false">自媒体</a></li>
                        <li><a href="#main-9" @click.self="smMenuFlag=false">区块链项目</a></li>
                        <li><a href="#main-11" @click.self="smMenuFlag=false">行业公司</a></li>
                        <li><a href="#main-14" @click.self="smMenuFlag=false">区块链游戏</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header-nav__bottom clearfix row hidden-md hidden-sm hidden-xs">
            <div class="container">
                <div class="row">
                    <div class="item fl" v-for="(item,index) in advisorys" :key="index"><a :title="item.advisoryName" target="_blank" @click="openUrl(item.advisoryUrl,item.advisoryFriends)"><b v-show="index==0">好文：</b>{{getStr(index,item.advisoryName)}}</a></div>
                </div>
            </div>
        </div>
    </header>
    <div class="main container">
        <div class="row">
            <div class="main-box1">
                <h2 class="main-box__title">精品推荐<span class="line"></span></h2>
                <div class="container clearfix">
                    <div class="main-box__content row">
                        <div class="col-lg-3 col-md-4 col-sm-6" v-for="(item,index) in topbanners" :key="index" @click="openUrl(item.topbannerUrl,item.topbannerFriendsid)"><div class="pic"><img :src="item.topbannerImage" :alt="item.topbannerDetail"><div class="mask"></div><p class="text">{{item.topbannerDetail}}</p></div></div>
                    </div>
                </div>
            </div>
            <div class="main-box2">
                <h2 class="main-box__title">常用必备<span class="line"></span></h2>
                <div class="container clearfix">
                    <div class="main-box__content row">
                        <div class="col-lg-6 col-md-12 p0">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6" v-for="(item,index) in need1" :key="index"><div class="pic" :style="{background:item.currencyBackgroundColor}" @click="openUrl(item.currencyUrl,item.currencyFriendid)"><img :src="item.currency_image_logo_two" :alt="item.currencyDetail"></div></div>
                        </div>
                        <div class="col-lg-6 col-md-12 p0">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6" v-for="(item,index) in need2" :key="index"><div class="pic" :style="{background:item.currencyBackgroundColor}" @click="openUrl(item.currencyUrl,item.currencyFriendid)"><img :src="item.currency_image_logo_two" :alt="item.currencyDetail"></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-box3" :id="'main-'+indexouter" v-for="(items,indexouter) in details" :key="indexouter" v-if="indexouter!=2&&indexouter!=3">
                <h2 class="main-box__title">{{items[0].typeName}}<span class="line"></span></h2>
                <div class="container clearfix">
                    <div class="main-box__content row">
                        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(item,index) in items" @click="openUrl(item.currencyUrl,item.currencyFriendid)">
                            <div class="pic">
                                <div v-if="indexouter!=4&&indexouter!=5" class="color fl" :style="{background:item.currencyBackgroundColor}">{{item.currency_text}}</div>
                                <img v-if="indexouter==4||indexouter==5" class="color-logo fl" :src="item.currency_image_logo" :alt="item.currencyDetail">
                                <div class="fl">
                                    <h3>{{item.currencyName.length>8?item.currencyName.slice(0,8)+'...':item.currencyName}}</h3>
                                    <p>{{item.currencyDetail.length>10?item.currencyDetail.slice(0,10)+'...':item.currencyDetail}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <img id="code" class="hidden-xs hidden-sm" src="./assets/images/code.png">
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data(){
    return{
        smMenuFlag:false,
        tops:[],        //  头部导航-top
        advisorys:[],   //  头部导航-bottom
        topbanners:[],  //  精品推荐
        need1:[],       //  常用必备
        need2:[],       //  常用必备
        details:{},     //  剩下栏目
    }
  },
  methods:{
    getStr(index,str){
        let _this = this;
        if(index==0){
            return _this.getLength(str)>10?str.slice(0,10)+'...':str;
        }else{
            return _this.getLength(str)>13?str.slice(0,13)+'...':str;
        }
    },
    /*------获取输入字符实际长度------*/
    getLength(str) {
        let realLenth = 0,
            charCode = -1;
        for (let i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLenth += 1;
            } else {
                realLenth += 2;
            }
        }
        return realLenth;
    },
    openUrl(url,friendId){
        window._czc.push(['_trackEvent', friendId, '点击统计']);
        window.open(url);
    },
    fetch(){
        let _this = this;
        axios.get('//www.lian2345.com/daikuan/api/all').then(res=>{
            const result = res.data;
            _this.tops = result.tops;
            _this.advisorys = result.advisorys;
            _this.topbanners = result.topbanners;
            _this.need1 = result.details['3'].slice(0,8);
            _this.need2 = result.details['3'].slice(8);
            _this.details = result.details;
        }).catch(err=>console.log(err));
    }
  },
  mounted(){
    const _this = this;
    _this.fetch();
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_1273522622'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1273522622' type='text/javascript'%3E%3C/script%3E"));
    var _czc = window._czc || [];
      _czc.push(["_setAccount", "1273522622"]);
  }
}
</script>

<style lang="less">
#cnzz_stat_icon_1273522622{
    display:none;
}
#app {
    padding-bottom: 30px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F2F2F2;
}
#code{
    display: block;
    position: fixed;
    right: 0;
    top:45%;
    width: 160px;
}
.header-nav{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 16px;
    background-color: #FFFFFF;
    z-index: 999;
}
.sm-button{
    margin-top: 17px;
    margin-right: 15px;
    width: 44px;
    height: 34px;
    line-height: 34px;
    border: none;
    border-radius: 4px;
}
.sm-menu{
    position: absolute;
    top: 68px;
    left: 0;
    width: 100%;
    height: 0;
    opacity: 0;
    background: #FAFAFA;
    transition: all 0.4s;
    overflow: hidden;
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #CCCCCC;
    li{
        height: 40px;
        line-height: 40px;
        a{
            display: block;
        }
    }
    li:hover{
        background-color: #f4f4f4;
    }
}
.sm-menu.display{
    height: 320px;
    opacity: 1
}
.header-nav__top,.header-nav__bottom{
    height: 68px;
    line-height: 68px;
}
.header-nav__top{
    .logo{
        margin-right: 30px;
        width: 120px;
        padding-top: 12px;
        img{    
            float: left;
            width:100%;
            height:auto;
        }
        h1{
            color: #5e35b1;
            font-size:23px;
            font-weight: bold;
            font-style: italic;
            margin-top: 24px;
        }
    }
    li:hover{
        background-color: #f4f4f4;
    }
    a{
        display: block;
        height: 68px;
        padding: 0 28px;
        color: #212121;
    }
}
.header-nav__bottom{
    height: 68px;
    line-height: 68px;
    background-color: #FAFAFA;
    font-size: 14px;
    .item{
        width: 20%;
        height: 68px;
        line-height: 68px;
        text-align: left;
        a{
            color: #888888;
            cursor:pointer;
        }
        a:hover{
            color: #5e35b1;
        }
    }
}
/*中心布局*/
.main{
    padding-top: 158px;
}
.main-box__title{
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #F4F4F4;
    .line{
        position: absolute;
        left: 50%;
        bottom: 1px;
        width: 60px;
        height: 1px;
        background-color: #78E42B;
        transform: translateX(-50%);
        -webkit-transform:translateX(-50%);
    }
}
.main-box__content{
    padding: 24px;
}
/*子模块通用*/
.main-box1,.main-box2{
    background-color: #FFFFFF;
    border-radius: 10px;
}
/*精品推荐*/
.main-box1{
    margin-bottom: 30px;
    .row>div{
        margin-bottom: 24px;
    }
    .pic{
        position: relative;
        margin: 0 auto;
        width: 270px;
        height: 168px;
        border-radius:10px;
        overflow: hidden;
        cursor: pointer;
        img{
            width: 100%;
        }
        .mask{
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 270px;
            height: 168px;
            background: rgba(0,0,0,0.2);
        }
        .text{
            position: absolute;
            left: 0;
            bottom: -30px;
            width: 270px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #FFFFFF;
            font-size: 14px;
            background:rgba(0,0,0,1);
            opacity:0.7;
            transition: all 0.2s; 
        }
    }
    .pic:hover{
        box-shadow: 0px 6px 6px rgba(0,0,0,0.3);
        .mask{
            opacity: 1;
        }
        .text{
            bottom: 0;
        }
    }
}
/*常用必备*/
.main-box2{
    img{
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 90%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }
    .p0{
        padding: 0;
    }
    .pic{
        position: relative;
        margin: 0 auto 24px;
        width: 130px;
        height: 80px;
        border-radius: 10px;
        transition: all 0.4s;
        cursor: pointer;
    }
    .pic:hover{
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.5);
    }
}
.main-box3{
    padding-top: 156px;
    margin-top: -126px;
    .main-box__title{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #FFFFFF;
    }
    .main-box__content{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #FFFFFF;
    }
    .pic{
        padding: 20px;
        margin: 0 auto 16px;
        width: 270px;
        height: 80px;
        border-radius: 4px;
        /*background:rgba(241,242,249,1);*/
        transition: all 0.4s;
        cursor: pointer;
        .color{
            margin-right: 16px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            font-size: 20px;
            color: #FFFFFF;
            text-align: center;
        }
        .color-logo{
            display: block;
            margin-right: 16px;
            width: 40px;
        }
        &>div{
            background: transparent;
        }
        h3{
            margin-bottom: 4px;
            font-size: 18px;
        }
        p{
            font-size: 14px;
            color: #A1A7B6;
        }
    }
    .pic:hover{
        background:rgba(241,242,249,1);
        box-shadow: 6px 6px 6px rgba(0,0,0,0.3);
    }
}
/*小于1200px*/
@media (max-width:1200px){
    .main{
        padding-top: 90px;
    }
    .main-box3{
        padding-top: 88px;
        margin-top: -58px;
    }
}
@media (max-width:768px){
    .logo{
        padding-left: 15px;
        h1{
            font-size:20px !important;
            margin-top: 21px !important;
        }
    }
}
@media (max-width:500px){
    .logo{
        padding-top: 23px !important;
        width:90px !important;
        h1{
            font-size:14px !important;
            margin-top: 16px !important;
        }
    }
}
</style>
