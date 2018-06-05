<template>
    <div class="page">
        <header-item :title="$t('m.mine')" :back="false" color="#374452"></header-item>
        <div class="user-bar">
            <div>
                <span class="round round-1"></span>
                <span class="round round-2"></span>
                <span class="round round-3"></span>
                <span class="round round-4"></span>
                <span class="round round-5"></span>
                <img class="user-icon" :src="userIcon">
                <p class="user-phone-number" v-text="phoneNumber"></p>
            </div>
        </div>
        <list-item class="contact-list" :bg="bg" show-arrow :icon="require('../../../../static/images/contactList.png')" :title="$t('m.contacts')" v-tap="{methods: jump, path: 'contactList'}"></list-item>
        <hr />
        <list-item class="list-item" :bg="bg" show-arrow :icon="require('../../../../static/images/safeCenter.png')" :title="$t('m.safeCenter')" v-tap="{methods: jump, path: 'safeCenter'}"></list-item>
        <hr />
        <list-item class="list-item" :bg="bg" show-arrow :icon="require('../../../../static/images/sysSet.png')" :title="$t('m.systemSet')" v-tap="{methods: jump, path: 'setting'}"></list-item>
        <hr />
        <list-item class="list-item" :bg="bg" show-arrow :icon="require('../../../../static/images/aboutUs.png')" :title="$t('m.aboutUs')" v-tap="{methods: jump, path: 'aboutUs'}"></list-item>
    </div>
</template>

<script>
    // 用户头像
    import userImage from '../../../../static/images/icon/1.png'

    import ListItem from '../../../commons/components/ListItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'    

    export default {
        name: 'About',
        components: {
            ListItem,
            HeaderItem
        },
        data () {
            return {
                phoneNumber: '',
                userIcon: userImage,
                bg: '#FFF'
            }
        },
        mounted () {
            this.phoneNumber = this.$store.state.username
        },
        methods: {
            jump (params) {
                this.$router.push({
                    path: `/${params.path}`
                })
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .mint-header-title{
        font-family: PingFangSC-Light;
    }
    .user-bar{
        height: 3.71rem;
    }
    .user-bar>div{
        position: relative;
        z-index: 1;
        height: 2.67rem;
        background-color: #29DC54;
    }
    .user-bar>div:after{
        content: ' ';
        position: absolute;
        left: -5%;
        bottom: -1.4rem;
        z-index: -2;
        width: 110%;
        height: 4rem;
        border-radius: 0 0 50% 50%;
        background-color: #29DC54;
    }
    .round{
        position: absolute;
    }
    .round-1 {
        top: 2.38rem;
        left: 1rem;
        width: .47rem;
        height: .47rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-2 {
        top: .4rem;
        left: 2.3rem;
        width: .23rem;
        height: .23rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-3{
        top: 1.25rem;
        left: 3.13rem;
        width: .74rem;
        height: .74rem;
        border: #5fe57f solid .04rem;
        border-radius: 100%;
    }
    .round-4 {
        top: .69rem;
        left: 6.92rem;
        width: .7rem;
        height: .7rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .round-5 {
        top: 2.47rem;
        left: 9.7rem;
        width: .3rem;
        height: .3rem;
        background-color: #5fe57f;
        border-radius: 100%;
    }
    .user-icon{
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        position: absolute;
        top: 0.92rem;
        left: 50%;
        transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);     /* IE 9 */
        -moz-transform: translate(-50%, 0);    /* Firefox */
        -webkit-transform: translate(-50%, 0); /* Safari 和 Chrome */
        -o-transform: translate(-50%, 0);  /* Opera */
    }
    .user-phone-number{
        font-size: 0.42rem;
        font-family: PingFangSC-Light;
        color: rgba(255,255,255,1);
        text-align: center;
        position: absolute;
        bottom: -0.58rem;
        left: 50%;
        transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);     /* IE 9 */
        -moz-transform: translate(-50%, 0);    /* Firefox */
        -webkit-transform: translate(-50%, 0); /* Safari 和 Chrome */
        -o-transform: translate(-50%, 0);  /* Opera */
    }
    .contact-list{
        margin-top: 0.63rem;
        margin-bottom: 0.3rem;
    }
</style>