<template>
    <div class="page">
        <header-item :title="$t('m.safeCenter')"></header-item>
        <hr />
        <list-item class="edit-password" :bg="bg" :title="$t('m.modifyLoginPassword')" :title-style="titleStyle" show-arrow v-tap="{methods: jump, path: 'editLoginPassword'}"></list-item>
        <list-item class="list-item" :bg="bg" :title="$t('m.phone')" :title-style="titleStyle" :right-content="rightContentPhone" :right-content-style="rightContentStyle" :show-arrow="!phoneNumber" v-tap="{methods: jump, path: 'bindPhone'}"></list-item>
        <hr />
        <list-item class="list-item" :bg="bg" :title="$t('m.email')" :title-style="titleStyle" :right-content="rightContentEmail" :right-content-style="rightContentStyle" :show-arrow="!emailAddress" v-tap="{methods: jump, path: 'bindEmail'}"></list-item>
        <button-item class="btn" :title="$t('m.safeExit')" bg="#F43E3A" v-tap="{ methods: quit }"></button-item>
    </div>
</template>

<script>
    import ListItem from '../../../commons/components/ListItem.vue'
    import HeaderItem from '../../../commons/components/HeaderItem.vue'
    import ButtonItem from '../../../commons/components/ButtonItem.vue'    
    import { formatPhoneNumber } from '../../../lib/js/tools.js'
    import { MessageBox } from 'mint-ui'
    export default {
        name: '',
        components: {
            ListItem,
            HeaderItem,
            ButtonItem
        },
        data () {
            return {
                bg: '#F4F7F9',
                phoneNumber: '',
                emailAddress: ''
            }
        },
        mounted () {
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            this.phoneNumber = user.phone
            this.emailAddress = user.email
        },
        computed: {
            rightContentPhone () {
                return formatPhoneNumber(this.phoneNumber) || this.$t('m.unbound')
            },
            rightContentEmail () {
                return this.emailAddress || this.$t('m.unbound')
            },
            titleStyle () {
                return {
                    color: '#555555'
                }
            },
            rightContentStyle () {
                return {
                    color: '#777777'
                }
            }
        },
        methods: {
            jump (params) {
                let path = params.path
                if ('bindEmail' === path && this.emailAddress) {
                    return
                }
                if ('bindPhone' === path && this.phoneNumber) {
                    return
                }
                let param = {
                    path: `/${params.path}`
                }
                if (params.path === 'editLoginPassword') {
                    param.query = {
                        pageName: 'editPassword'
                    }
                }
                this.$router.push(param)
            },
            quit () {
                MessageBox.close()
                MessageBox.confirm(this.$t('m.isLogout')).then(action => {
                    window.sessionStorage.clear()
                    this.jump({ path: 'login'})
                    this.$store.commit('setWalletList', [])
                    this.$store.commit('setToken', '')
                }).catch(cancel => {
                    
                })
                
            }
        }
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
    }
    .edit-password{
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
    }
    .btn{
        position: absolute;
        left: 50%;
        bottom: 2.61rem;
        transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);     /* IE 9 */
        -moz-transform: translate(-50%, 0);    /* Firefox */
        -webkit-transform: translate(-50%, 0); /* Safari 和 Chrome */
        -o-transform: translate(-50%, 0);  /* Opera */
    }
</style>